"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane,
  Calendar as CalendarIcon,
  Sparkles,
  Clock,
  Users,
  Banknote,
  AlertCircle,
  ArrowRight,
  Globe2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PassengerSelect } from "@/components/flight-search/PassengerSelect";
import { TestScenarios } from "@/components/test/TestScenarios";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [tripType, setTripType] = useState("round");
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", date: null },
    { from: "", to: "", date: null },
  ]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Discover Your Next Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience seamless flight booking with our elegant testing environment
          </p>
        </div>

        <Card className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700">
            <CardTitle className="text-2xl">Flight Search</CardTitle>
            <CardDescription>Find the perfect flight for your journey</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="round" className="w-full" onValueChange={setTripType}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="round">Round Trip</TabsTrigger>
                <TabsTrigger value="oneway">One Way</TabsTrigger>
                <TabsTrigger value="multi">Multi-City</TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select departure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">Istanbul (IST)</SelectItem>
                        <SelectItem value="esb">Ankara (ESB)</SelectItem>
                        <SelectItem value="ayt">Antalya (AYT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jfk">New York (JFK)</SelectItem>
                        <SelectItem value="lhr">London (LHR)</SelectItem>
                        <SelectItem value="cdg">Paris (CDG)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departure</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <PassengerSelect />
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white">
                  <Plane className="mr-2 h-5 w-5" />
                  Search Flights
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900">
                  <Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <CardTitle>Real-time Updates</CardTitle>
                  <CardDescription>Track flight status and changes</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Globe2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle>Global Coverage</CardTitle>
                  <CardDescription>Access worldwide destinations</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Premium Experience</CardTitle>
                  <CardDescription>Enjoy exclusive benefits</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}