import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Truck, Shield, CheckCircle, TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import heroImage from "@/assets/hero-nourishnet.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-accent/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Connecting Communities, Reducing Waste</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Share Food,
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                  Feed Hope
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Connect food donors with those in need. Our smart matching system ensures surplus food reaches the right people at the right time.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">Meals Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent shadow-medium hover:shadow-strong transition-all">
                  <Link to="/auth?mode=signup">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="hover:bg-primary/5">
                  <Link to="/browse">Browse Available Food</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fadeIn">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-3xl" />
              <img
                src={heroImage}
                alt="Community food sharing"
                className="relative rounded-2xl shadow-strong w-full hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple & Effective Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How NourishNet Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes food redistribution simple, efficient, and impactful in just four easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 shadow-soft">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl font-bold text-primary/20 absolute top-4 right-4">1</div>
                <CardTitle className="text-xl">Donate Food</CardTitle>
                <CardDescription className="text-base">
                  Restaurants, grocers, and individuals can list surplus food with photos and details
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mb-4 shadow-soft">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl font-bold text-secondary/20 absolute top-4 right-4">2</div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
                <CardDescription className="text-base">
                  Our AI matches donations to recipients based on location, need, and preferences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-4 shadow-soft">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl font-bold text-accent/20 absolute top-4 right-4">3</div>
                <CardTitle className="text-xl">Coordinate Pickup</CardTitle>
                <CardDescription className="text-base">
                  Schedule convenient pickup times or arrange volunteer delivery services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 shadow-soft">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl font-bold text-primary/20 absolute top-4 right-4">4</div>
                <CardTitle className="text-xl">Track Impact</CardTitle>
                <CardDescription className="text-base">
                  Real-time notifications and tracking ensure food reaches those who need it
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-medium bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-strong transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-primary mb-2">2.5 Tons</CardTitle>
                <CardDescription className="text-base">
                  Food waste prevented this month through our platform
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-medium bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-strong transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-secondary mb-2">1,200+</CardTitle>
                <CardDescription className="text-base">
                  Families fed through our community network
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-medium bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-strong transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-accent mb-2">&lt; 30 Min</CardTitle>
                <CardDescription className="text-base">
                  Average matching time from donation to claim
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-none bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-strong relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <CardContent className="py-16 text-center relative">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join our community of donors, recipients, and volunteers working together to end food waste and hunger in India.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="shadow-medium hover:shadow-strong transition-all bg-white text-primary hover:bg-white/90">
                  <Link to="/auth?mode=signup">Join NourishNet Today</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/browse">Explore Donations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
