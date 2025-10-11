import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, Truck, Bell, TrendingUp } from "lucide-react";

interface Stats {
  activeDonations: number;
  completedMatches: number;
  pendingMatches: number;
  totalImpact: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    activeDonations: 0,
    completedMatches: 0,
    pendingMatches: 0,
    totalImpact: 0,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roleData) {
        setUserRole(roleData.role);
      }

      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      // Fetch active donations (for donors)
      const { count: activeDonations } = await supabase
        .from("food_donations")
        .select("*", { count: "exact", head: true })
        .eq("donor_id", user.id)
        .eq("status", "available");

      // Fetch completed matches
      const { count: completedMatches } = await supabase
        .from("donation_matches")
        .select("*", { count: "exact", head: true })
        .or(`recipient_id.eq.${user.id},volunteer_id.eq.${user.id}`)
        .eq("status", "completed");

      // Fetch pending matches
      const { count: pendingMatches } = await supabase
        .from("donation_matches")
        .select("*", { count: "exact", head: true })
        .or(`recipient_id.eq.${user.id},volunteer_id.eq.${user.id}`)
        .in("status", ["pending", "confirmed", "in_transit"]);

      // Fetch total impact (all donations or matches)
      let totalImpact = 0;
      if (userRole === "donor") {
        const { count } = await supabase
          .from("food_donations")
          .select("*", { count: "exact", head: true })
          .eq("donor_id", user.id);
        totalImpact = count || 0;
      } else {
        const { count } = await supabase
          .from("donation_matches")
          .select("*", { count: "exact", head: true })
          .or(`recipient_id.eq.${user.id},volunteer_id.eq.${user.id}`);
        totalImpact = count || 0;
      }

      setStats({
        activeDonations: activeDonations || 0,
        completedMatches: completedMatches || 0,
        pendingMatches: pendingMatches || 0,
        totalImpact,
      });
    };

    fetchStats();

    // Set up real-time subscriptions for live updates
    const donationsChannel = supabase
      .channel("donations_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "food_donations",
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    const matchesChannel = supabase
      .channel("matches_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donation_matches",
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(donationsChannel);
      supabase.removeChannel(matchesChannel);
    };
  }, [user, userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const roleCards = {
    donor: {
      title: "Post Food Donation",
      description: "List surplus food items for those in need",
      icon: Package,
      action: () => navigate("/create-donation"),
    },
    recipient: {
      title: "Browse Available Food",
      description: "Find and claim food donations near you",
      icon: Users,
      action: () => navigate("/browse"),
    },
    volunteer: {
      title: "Available Deliveries",
      description: "Help deliver food to recipients",
      icon: Truck,
      action: () => navigate("/matches"),
    },
  };

  const currentRoleCard = userRole && roleCards[userRole as keyof typeof roleCards];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your FoodShare activity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRoleCard && (
            <Card className="hover:shadow-medium transition-shadow cursor-pointer" onClick={currentRoleCard.action}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <currentRoleCard.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{currentRoleCard.title}</CardTitle>
                <CardDescription>{currentRoleCard.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-medium transition-shadow cursor-pointer" onClick={() => navigate("/matches")}>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>My Matches</CardTitle>
              <CardDescription>View and manage your food matches</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View All</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Live Stats</CardTitle>
              <CardDescription>Real-time updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {userRole === "donor" && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Donations</span>
                  <span className="font-semibold text-lg">{stats.activeDonations}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Matches</span>
                <span className="font-semibold text-lg">{stats.pendingMatches}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-semibold text-lg">{stats.completedMatches}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">Total Impact</span>
                <span className="font-bold text-xl text-primary">{stats.totalImpact}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
