'use client';

import { PassengerSelect } from '@/components/flight-search/PassengerSelect';
import { FlightSegment } from '@/components/flight-search/FlightSegment';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Plus, Plane, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

interface Flight {
  from: string;
  to: string;
  date: Date | undefined;
  stopover: string;
  fareType: string;
}

const defaultFlight: Flight = {
  from: '',
  to: '',
  date: undefined,
  stopover: 'direct',
  fareType: 'economy',
};

export default function SearchPage() {
  const [tripType, setTripType] = useState('round');
  const [outboundFlight, setOutboundFlight] = useState<Flight>(defaultFlight);
  const [returnFlight, setReturnFlight] = useState<Flight>(defaultFlight);
  const [multiCityFlights, setMultiCityFlights] = useState<Flight[]>([
    { ...defaultFlight },
    { ...defaultFlight },
  ]);

  const updateOutboundFlight = (field: keyof Flight, value: any) => {
    setOutboundFlight((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-update return flight for round trips
      if (tripType === 'round' && (field === 'from' || field === 'to')) {
        setReturnFlight((prev) => ({
          ...prev,
          from: updated.to,
          to: updated.from,
        }));
      }
      return updated;
    });
  };

  const updateReturnFlight = (field: keyof Flight, value: any) => {
    setReturnFlight((prev) => {
      const updated = { ...prev, [field]: value };
      // Update outbound flight's from/to when return flight's from/to is changed
      if (tripType === 'round' && (field === 'from' || field === 'to')) {
        setOutboundFlight((prev) => ({
          ...prev,
          from: updated.to,
          to: updated.from,
        }));
      }
      return updated;
    });
  };

  const swapFlights = () => {
    setOutboundFlight((prevOutbound) => {
      const updatedOutbound = {
        ...returnFlight,
        from: returnFlight.from,
        to: returnFlight.to,
        date: prevOutbound.date,
        stopover: returnFlight.stopover,
        fareType: returnFlight.fareType,
      };
      setReturnFlight({
        ...prevOutbound,
        from: prevOutbound.from,
        to: prevOutbound.to,
        date: returnFlight.date,
        stopover: prevOutbound.stopover,
        fareType: prevOutbound.fareType,
      });
      return updatedOutbound;
    });
  };

  const addFlight = () => {
    if (multiCityFlights.length < 5) {
      setMultiCityFlights([...multiCityFlights, { ...defaultFlight }]);
    }
  };

  const removeFlight = (index: number) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(multiCityFlights.filter((_, i) => i !== index));
    }
  };

  const updateMultiCityFlight = (
    index: number,
    field: keyof Flight,
    value: any
  ) => {
    setMultiCityFlights((prev) =>
      prev.map((flight, i) =>
        i === index ? { ...flight, [field]: value } : flight
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Flight
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Search through thousands of destinations worldwide
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-0 ring-1 ring-gray-200 dark:ring-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle>Flight Search</CardTitle>
            <CardDescription>
              Choose your journey type and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="round"
              className="w-full"
              onValueChange={setTripType}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="round">Round Trip</TabsTrigger>
                <TabsTrigger value="oneway">One Way</TabsTrigger>
                <TabsTrigger value="multi">Multi-City</TabsTrigger>
              </TabsList>

              <TabsContent value="round" className="space-y-6">
                <div className="relative space-y-4">
                  <FlightSegment
                    flight={outboundFlight}
                    onUpdate={updateOutboundFlight}
                    className="border-blue-200 dark:border-blue-800"
                  />
                  <div className="flex items-center justify-center -my-3 relative z-10">
                    <button
                      onClick={swapFlights}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors cursor-pointer"
                      aria-label="Swap flights"
                    >
                      <ArrowRightLeft className="h-5 w-5" />
                    </button>
                  </div>
                  <FlightSegment
                    flight={returnFlight}
                    onUpdate={updateReturnFlight}
                    className="border-purple-200 dark:border-purple-800"
                  />
                  <div className="mt-6">
                    <PassengerSelect />
                  </div>
                  <Button className="w-full h-12 mt-6 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700">
                    <Plane className="mr-2 h-5 w-5" />
                    Search Flights
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="oneway" className="space-y-6">
                <FlightSegment
                  flight={outboundFlight}
                  onUpdate={updateOutboundFlight}
                  className="border-blue-200 dark:border-blue-800"
                />
                <PassengerSelect />
                <Button className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700">
                  <Plane className="mr-2 h-5 w-5" />
                  Search Flights
                </Button>
              </TabsContent>

              <TabsContent value="multi" className="space-y-6">
                {multiCityFlights.map((flight, index) => (
                  <FlightSegment
                    key={index}
                    flight={flight}
                    onUpdate={(field, value) =>
                      updateMultiCityFlight(index, field as keyof Flight, value)
                    }
                    onRemove={() => removeFlight(index)}
                    showRemove={multiCityFlights.length > 2}
                    className={cn(
                      'transition-all duration-200',
                      index === 0 && 'border-blue-200 dark:border-blue-800',
                      index === multiCityFlights.length - 1 &&
                        'border-purple-200 dark:border-purple-800'
                    )}
                  />
                ))}

                {multiCityFlights.length < 5 && (
                  <Button
                    variant="outline"
                    onClick={addFlight}
                    className="w-full h-12"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Flight
                  </Button>
                )}

                <PassengerSelect />

                <Button className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700">
                  <Plane className="mr-2 h-5 w-5" />
                  Search Flights
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
