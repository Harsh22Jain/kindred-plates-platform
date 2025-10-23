import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Restaurant Owner",
    image: "👩‍🍳",
    text: "NourishNet helped us donate surplus food to 50+ families monthly. No more wastage!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "NGO Coordinator",
    image: "🧑‍💼",
    text: "The smart matching system ensures we receive exactly what we need, when we need it.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Volunteer",
    image: "👩",
    text: "Being part of this community and helping deliver food to those in need is incredibly rewarding.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Trusted by Community</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from donors, recipients, and volunteers making a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-8xl text-primary/5">
                <Quote />
              </div>
              <CardContent className="pt-8 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
