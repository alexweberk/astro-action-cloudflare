"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { actions } from "astro:actions";
import { useState } from "react";

export function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await actions.chat.generateText({
      prompt,
    });
    if (error) {
      setError(error.message);
      return;
    }
    setGeneratedText(data.text);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      {" "}
      {/* Increased max-width */}
      <CardHeader>
        <CardTitle>Text Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <Input
              type="text"
              placeholder="Enter your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
              name="prompt"
            />
          </div>
          <div>
            <Textarea
              placeholder="Generated text will appear here"
              value={generatedText}
              readOnly
              className="w-full h-32 bg-muted border-muted-foreground/20 cursor-not-allowed"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
