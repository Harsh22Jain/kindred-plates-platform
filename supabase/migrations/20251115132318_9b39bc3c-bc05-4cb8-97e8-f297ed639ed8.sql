-- Create function to send notifications when matches are created or updated
CREATE OR REPLACE FUNCTION notify_match_users()
RETURNS TRIGGER AS $$
DECLARE
  donor_id UUID;
  donation_title TEXT;
BEGIN
  -- Get donor_id and donation title
  SELECT fd.donor_id, fd.title INTO donor_id, donation_title
  FROM food_donations fd
  WHERE fd.id = NEW.donation_id;

  -- Notify recipient when match is created
  IF TG_OP = 'INSERT' THEN
    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      NEW.recipient_id,
      'New Match Created',
      'You have been matched with donation: ' || donation_title,
      'match',
      NEW.id
    );

    -- Notify donor about new match
    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      donor_id,
      'Donation Matched',
      'Your donation "' || donation_title || '" has been matched with a recipient',
      'match',
      NEW.id
    );
  END IF;

  -- Notify when volunteer picks up
  IF TG_OP = 'UPDATE' AND NEW.volunteer_id IS NOT NULL AND OLD.volunteer_id IS NULL THEN
    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      NEW.recipient_id,
      'Volunteer Assigned',
      'A volunteer has been assigned to deliver your donation',
      'match',
      NEW.id
    );

    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      donor_id,
      'Volunteer Assigned',
      'A volunteer has been assigned to your donation',
      'match',
      NEW.id
    );
  END IF;

  -- Notify when status changes to completed
  IF TG_OP = 'UPDATE' AND NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      NEW.recipient_id,
      'Donation Completed',
      'Your donation has been delivered! Please rate your experience.',
      'match',
      NEW.id
    );

    INSERT INTO notifications (user_id, title, message, type, related_id)
    VALUES (
      donor_id,
      'Donation Completed',
      'Your donation has been successfully delivered!',
      'match',
      NEW.id
    );

    IF NEW.volunteer_id IS NOT NULL THEN
      INSERT INTO notifications (user_id, title, message, type, related_id)
      VALUES (
        NEW.volunteer_id,
        'Delivery Completed',
        'Thank you for completing the delivery!',
        'match',
        NEW.id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for match notifications
DROP TRIGGER IF EXISTS match_notification_trigger ON donation_matches;
CREATE TRIGGER match_notification_trigger
AFTER INSERT OR UPDATE ON donation_matches
FOR EACH ROW
EXECUTE FUNCTION notify_match_users();