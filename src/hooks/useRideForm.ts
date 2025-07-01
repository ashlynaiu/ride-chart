import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { Ride } from '../store/slices/ridesSlice';

type UseRideFormProps = {
  defaultValues?: Partial<Ride>;
};

type UseRideFormReturn = {
  form: UseFormReturn<Partial<Ride>>;
  handleSubmit: (data: Partial<Ride>) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
};

export const useRideForm = ({
  defaultValues = {},
  onSubmit,
}: UseRideFormProps & {
  onSubmit: (data: Partial<Ride>) => Promise<void>;
}): UseRideFormReturn => {
  const form = useForm<Partial<Ride>>({
    defaultValues: {
      area: '',
      timeToDrive: '',
      trailName: '',
      difficulty: '',
      distance: '',
      elevation: '',
      routeType: '',
      rating: 5,
      reviewLink: '',
      notes: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (data: Partial<Ride>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting,
    error,
  };
};

// Validation schema for the ride form
export const rideFormValidation = {
  area: {
    required: 'Area is required',
    minLength: {
      value: 2,
      message: 'Area must be at least 2 characters',
    },
  },
  trailName: {
    required: 'Trail name is required',
    minLength: {
      value: 2,
      message: 'Trail name must be at least 2 characters',
    },
  },
  difficulty: {
    required: 'Difficulty is required',
    validate: (value: string) =>
      ['Easy', 'Intermediate', 'Difficult'].includes(value) ||
      'Invalid difficulty level',
  },
  distance: {
    required: 'Distance is required',
    pattern: {
      value: /^\d+(\.\d+)?\s*(miles?|mi|km|kilometers?)?$/i,
      message: 'Please enter a valid distance (e.g., 10 miles, 5.5 km)',
    },
  },
  elevation: {
    required: 'Elevation is required',
    pattern: {
      value: /^\d+\s*(ft|feet|m|meters?)?$/i,
      message: 'Please enter a valid elevation (e.g., 1200 ft, 500m)',
    },
  },
  routeType: {
    required: 'Route type is required',
    validate: (value: string) =>
      ['Loop', 'Out & Back', 'Point to Point'].includes(value) ||
      'Invalid route type',
  },
  rating: {
    required: 'Rating is required',
    min: {
      value: 1,
      message: 'Minimum rating is 1',
    },
    max: {
      value: 5,
      message: 'Maximum rating is 5',
    },
  },
  reviewLink: {
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
      message: 'Please enter a valid URL',
    },
  },
};
