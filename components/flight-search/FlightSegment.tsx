'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeftRight } from 'lucide-react';

interface FlightSegmentProps {
  flight: {
    from: string;
    to: string;
    date: Date | undefined;
    stopover: string;
    fareType: string;
  };
  onUpdate: (field: string, value: any) => void;
  onRemove?: () => void;
  showRemove?: boolean;
  className?: string;
  disabled?: boolean;
  isReturn?: boolean;
  linkedFlightUpdate?: (field: string, value: any) => void;
}

export function FlightSegment({
  flight,
  onUpdate,
  onRemove,
  showRemove,
  className,
  disabled = false,
  isReturn = false,
  linkedFlightUpdate,
}: FlightSegmentProps) {
  const handleReverse = () => {
    const from = flight.from;
    const to = flight.to;

    // Update current flight segment
    onUpdate('from', to);
    onUpdate('to', from);

    // If this is a return flight and we have a linked flight update function,
    // update the outbound flight's from/to as well
    if (isReturn && linkedFlightUpdate) {
      linkedFlightUpdate('from', to);
      linkedFlightUpdate('to', from);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div
      className={`relative p-6 border rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow ${
        className || ''
      }`}
    >
      {showRemove && onRemove && (
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select
              value={flight.from}
              onValueChange={(value) => onUpdate('from', value)}
              disabled={disabled}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select departure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">Istanbul (IST)</SelectItem>
                <SelectItem value="esb">Ankara (ESB)</SelectItem>
                <SelectItem value="ayt">Antalya (AYT)</SelectItem>
                <SelectItem value="jfk">New York (JFK)</SelectItem>
                <SelectItem value="lhr">London (LHR)</SelectItem>
                <SelectItem value="cdg">Paris (CDG)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleReverse}
            disabled={disabled}
            className="h-12 w-12 mb-[2px] hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select
              value={flight.to}
              onValueChange={(value) => onUpdate('to', value)}
              disabled={disabled}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jfk">New York (JFK)</SelectItem>
                <SelectItem value="lhr">London (LHR)</SelectItem>
                <SelectItem value="cdg">Paris (CDG)</SelectItem>
                <SelectItem value="ist">Istanbul (IST)</SelectItem>
                <SelectItem value="esb">Ankara (ESB)</SelectItem>
                <SelectItem value="ayt">Antalya (AYT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full h-12 justify-start text-left font-normal ${
                    !flight.date ? 'text-muted-foreground' : ''
                  }`}
                  disabled={disabled}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {flight.date ? formatDate(flight.date) : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={flight.date}
                  onSelect={(date) => onUpdate('date', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stopover Preference</label>
            <Select
              value={flight.stopover}
              onValueChange={(value) => onUpdate('stopover', value)}
              disabled={disabled}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct Only</SelectItem>
                <SelectItem value="1-stop">1 Stop Max</SelectItem>
                <SelectItem value="2-stop">2 Stops Max</SelectItem>
                <SelectItem value="any">Any Number of Stops</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fare Type</label>
            <Select
              value={flight.fareType}
              onValueChange={(value) => onUpdate('fareType', value)}
              disabled={disabled}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
