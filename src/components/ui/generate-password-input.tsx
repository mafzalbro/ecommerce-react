"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Assuming the Input component is being imported correctly
import { Button } from "@/components/ui/button"; // Shadcn Button for triggering password generation
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"; // Shadcn Dialog
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./label";

const getStrengthColor = (strength: string) => {
  switch (strength) {
    case "Weak":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Strong":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function GeneratePasswordInput({
  name,
  id,
  value,
  onChange, // Add onChange prop
}: {
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Type for onChange
}) {

  const defaultSliderValue = 8;

  const { toast } = useToast();

  const [password, setPassword] = useState<string>(value); // Set initial password to value prop
  const [passwordStrength, setPasswordStrength] = useState<string>("Weak");
  const [sliderValue, setSliderValue] = useState<number>(defaultSliderValue);
  const [useLowercase, setUseLowercase] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useDigits, setUseDigits] = useState<boolean>(true);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const generatePasswordStrength = (password: string) => {
    if (password.length === 0) return setPasswordStrength("Weak")
    if (password.length < 8) return setPasswordStrength("Weak");
    if (password.length < 12) return setPasswordStrength("Medium");
    return setPasswordStrength("Strong");
  };

  const generatePassword = useCallback(() => {
    let characters = "";
    if (useLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useDigits) characters += "0123456789";
    if (useSpecialChars) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (characters.length === 0) {
      toast({
        title: "Please select at least one character type.",
        description: "Lowercase, Uppercase, Digits, or Special Characters.",
        variant: "destructive",
      });
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < sliderValue; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(generatedPassword);
    onChange({ target: { name, value: generatedPassword } }); // Notify parent of new password
  }, [sliderValue, useLowercase, useUppercase, useDigits, useSpecialChars, toast, name, onChange]);

  useEffect(() => {
    generatePasswordStrength(password);
    onChange({ target: { name, value: password } }); // Notify parent of password change
  }, [password, onChange, name]);

  return (
    <>
      <div className="flex flex-col">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <span className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant={"link"} type="button" className="text-xs">Generate Password</Button>
            </span>
          </DialogTrigger>
          <DialogContent className="w-[300px] p-6">
            <h3 className="text-lg font-bold text-center text-neutral-900">Generate Password</h3>

            <div className="mt-4">
              <Label className="flex items-center my-4">
                <Switch
                  className="mr-2"
                  checked={useLowercase}
                  onCheckedChange={setUseLowercase}
                />
                Lowercase Letters
              </Label>
              <Label className="flex items-center my-4">
                <Switch
                  className="mr-2"
                  checked={useUppercase}
                  onCheckedChange={setUseUppercase}
                />
                Uppercase Letters
              </Label>
              <Label className="flex items-center my-4">
                <Switch
                  className="mr-2"
                  checked={useDigits}
                  onCheckedChange={setUseDigits}
                />
                Digits
              </Label>
              <Label className="flex items-center my-4">
                <Switch
                  className="mr-2"
                  checked={useSpecialChars}
                  onCheckedChange={setUseSpecialChars}
                />
                Special Characters
              </Label>
            </div>
            <div className="mt-4">
              <Slider
                value={[sliderValue]}
                min={6}
                max={16}
                step={1}
                onValueChange={(value: [number]) => {
                  setSliderValue(value[0])
                  generatePassword()
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Length: {sliderValue}</span>
                <span>Password Strength:
                  <span className="text-primary-foreground ml-1">
                    {passwordStrength}
                  </span>
                </span>
              </div>
            </div>

            <div className="border px-4 py-2">
              {password}
            </div>

            <div className="mt-6 space-x-2 flex justify-center">
              <Button onClick={generatePassword} className="w-full">
                Generate Random
              </Button>
              <DialogClose asChild>
                <Button variant="secondary" className="w-full">
                  Insert
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-full">
          <Input
            type="password"
            id={id}
            name={name}
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              onChange(e); // Notify parent of password change
            }}
          />
        </div>
      </div>

      {password && <div
        className={`h-2 w-full rounded-md my-2 ${getStrengthColor(passwordStrength)}`}
      ></div>}
    </>
  );
}
