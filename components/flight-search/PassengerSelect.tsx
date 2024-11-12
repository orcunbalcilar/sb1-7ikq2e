"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useState } from "react";

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export function PassengerSelect() {
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const updatePassengers = (type: keyof PassengerCount, value: number) => {
    setPassengers(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Passengers</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-gray-500">Age 12+</div>
              </div>
              <Select
                value={passengers.adults.toString()}
                onValueChange={(value) => updatePassengers('adults', parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-gray-500">Age 2-11</div>
              </div>
              <Select
                value={passengers.children.toString()}
                onValueChange={(value) => updatePassengers('children', parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3,4,5,6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Infants</div>
                <div className="text-sm text-gray-500">Under 2</div>
              </div>
              <Select
                value={passengers.infants.toString()}
                onValueChange={(value) => updatePassengers('infants', parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}