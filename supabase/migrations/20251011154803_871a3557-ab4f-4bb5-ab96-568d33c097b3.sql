-- Enable realtime for food_donations table
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_donations;

-- Enable realtime for donation_matches table
ALTER PUBLICATION supabase_realtime ADD TABLE public.donation_matches;