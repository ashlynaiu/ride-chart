import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useRides } from '../../hooks/useRides';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type FormData = {
  area: string;
  timeToDrive: string;
  trailName: string;
  difficulty: string;
  distance: string;
  elevation: string;
  routeType: string;
  rating: number;
  reviewLink: string;
  notes: string;
};

const RideForm: React.FC = () => {
  const { rideId } = useParams<{ rideId?: string }>();
  const { rides, addRide, updateRide } = useRides();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!rideId;
  
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>();
  
  // Set form values if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const rideToEdit = rides.find(ride => ride.id === rideId);
      if (rideToEdit) {
        Object.entries(rideToEdit).forEach(([key, value]) => {
          if (key !== 'id') {
            setValue(key as keyof FormData, value);
          }
        });
      }
    }
  }, [rideId, rides, setValue, isEditMode]);
  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (isEditMode && rideId) {
        await updateRide({ id: rideId, ...data });
      } else {
        await addRide(data);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Error saving ride:', err);
      setError(err instanceof Error ? err.message : 'Failed to save ride');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center mb-4">
          <Link 
            to="/" 
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h2 className="text-lg font-medium text-gray-900">
            {isEditMode ? 'Edit Ride' : 'Add New Ride'}
          </h2>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Area */}
            <div className="sm:col-span-3">
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="area"
                  {...register('area', { required: 'Area is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                )}
              </div>
            </div>
            
            {/* Time to Drive */}
            <div className="sm:col-span-3">
              <label htmlFor="timeToDrive" className="block text-sm font-medium text-gray-700">
                Time to Drive from Everstoke *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="timeToDrive"
                  placeholder="e.g., 1 hour 15 minutes"
                  {...register('timeToDrive', { required: 'Time to drive is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.timeToDrive && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeToDrive.message}</p>
                )}
              </div>
            </div>
            
            {/* Trail Name */}
            <div className="sm:col-span-6">
              <label htmlFor="trailName" className="block text-sm font-medium text-gray-700">
                Trail Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="trailName"
                  {...register('trailName', { required: 'Trail name is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.trailName && (
                  <p className="mt-1 text-sm text-red-600">{errors.trailName.message}</p>
                )}
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="sm:col-span-2">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Difficulty *
              </label>
              <div className="mt-1">
                <select
                  id="difficulty"
                  {...register('difficulty', { required: 'Difficulty is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Difficult">Difficult</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
                )}
              </div>
            </div>
            
            {/* Distance */}
            <div className="sm:col-span-2">
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                Distance *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="distance"
                  placeholder="e.g., 10 miles"
                  {...register('distance', { required: 'Distance is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.distance && (
                  <p className="mt-1 text-sm text-red-600">{errors.distance.message}</p>
                )}
              </div>
            </div>
            
            {/* Elevation */}
            <div className="sm:col-span-2">
              <label htmlFor="elevation" className="block text-sm font-medium text-gray-700">
                Elevation *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="elevation"
                  placeholder="e.g., 1,200 ft"
                  {...register('elevation', { required: 'Elevation is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                {errors.elevation && (
                  <p className="mt-1 text-sm text-red-600">{errors.elevation.message}</p>
                )}
              </div>
            </div>
            
            {/* Route Type */}
            <div className="sm:col-span-3">
              <label htmlFor="routeType" className="block text-sm font-medium text-gray-700">
                Route Type *
              </label>
              <div className="mt-1">
                <select
                  id="routeType"
                  {...register('routeType', { required: 'Route type is required' })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select route type</option>
                  <option value="Loop">Loop</option>
                  <option value="Out & Back">Out & Back</option>
                  <option value="Point to Point">Point to Point</option>
                </select>
                {errors.routeType && (
                  <p className="mt-1 text-sm text-red-600">{errors.routeType.message}</p>
                )}
              </div>
            </div>
            
            {/* Rating */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Rating *
              </label>
              <div className="mt-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="cursor-pointer">
                      <input
                        type="radio"
                        value={star}
                        {...register('rating', { required: 'Rating is required' })}
                        className="sr-only"
                      />
                      <svg
                        className={`h-8 w-8 ${star <= (watch('rating') || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={() => setValue('rating', star, { shouldValidate: true })}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </label>
                  ))}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                )}
              </div>
            </div>
            
            {/* Review Link */}
            <div className="sm:col-span-6">
              <label htmlFor="reviewLink" className="block text-sm font-medium text-gray-700">
                Review Link
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="reviewLink"
                  placeholder="https://"
                  {...register('reviewLink')}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Notes */}
            <div className="sm:col-span-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  rows={3}
                  {...register('notes')}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link
              to="/"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Ride' : 'Add Ride'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper function to watch form values
function watch(field: string): number {
  // This is a placeholder - the actual implementation would depend on your form library
  // In a real implementation, you would use the watch function from react-hook-form
  return 0;
}

export default RideForm;
