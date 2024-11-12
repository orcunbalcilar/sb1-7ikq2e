"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, AlertCircle } from "lucide-react";

interface TestScenario {
  id: string;
  name: string;
  description: string;
  complexity: "low" | "medium" | "high";
  duration: string;
  prerequisites?: string[];
}

export function TestScenarios() {
  const scenarios: TestScenario[] = [
    {
      id: "last-minute",
      name: "Last Minute Booking",
      description: "Test booking a flight within 24 hours of departure",
      complexity: "medium",
      duration: "5-10 minutes",
      prerequisites: ["Available flights within 24h"],
    },
    {
      id: "multi-city",
      name: "Complex Multi-City Route",
      description: "Book a journey with 3+ stops across different time zones",
      complexity: "high",
      duration: "10-15 minutes",
      prerequisites: ["Multiple connected flights"],
    },
    {
      id: "mixed-class",
      name: "Mixed Cabin Classes",
      description: "Book different classes for outbound and return flights",
      complexity: "medium",
      duration: "5-10 minutes",
    },
  ];

  const complexityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  };

  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <Card key={scenario.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  {scenario.name}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </div>
              <Badge className={complexityColors[scenario.complexity]}>
                {scenario.complexity} complexity
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                Estimated duration: {scenario.duration}
              </div>
              
              {scenario.prerequisites && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Prerequisites:
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 pl-5">
                    {scenario.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button className="w-full">Run This Scenario</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}