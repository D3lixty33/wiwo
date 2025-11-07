"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserLoad } from "../actions/settings/user-load";
import { UserUpdate } from "../actions/settings/user-update";
import { UserDelete } from "../actions/settings/user-delete";

interface UserSettingsCardProps {
  user: User;
}

export function UserSettingsCard({ user }: UserSettingsCardProps) {
  // Local states
  const [password, setPassword] = useState<string>("");
  const [notifications, setNotifications] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>(user.full_name ?? "");
  const [email, setEmail] = useState<string>(user.email ?? "");
  const [field, setField] = useState<boolean>(false);

  // Handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEmail = email ?? user.email;
    const newfull_name = fullName ?? user.full_name;
    const newPassword = password ?? user.password;

    // TODO: Update settings of the single user
    try {
      UserUpdate({
        id: user.id,
        full_name: newfull_name,
        email: newEmail,
        password: newPassword,
      });
    } catch (error) {
      console.error("Error client side calling server action: " + error);
      throw new Error();
    }

    UserLoad();
  };

  const handleRemove = async () => {
    const id = user.id;
    const privilege = user.privileges;

    if (privilege === "A") {
      try {
        await UserDelete(id);
        await UserLoad();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      setField(true); // show "no permission" modal
    }
  };

  return (
    <Card className="rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Account Settings – {fullName || "Unnamed User"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage details for {user.email}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`id-${user.id}`}>User ID</Label>
            <Input id={`id-${user.id}`} value={user.id} readOnly />
          </div>

          {/* Created at */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`created-${user.id}`}>Created At</Label>
            <Input
              id={`created-${user.id}`}
              value={new Date(user.created_at).toLocaleString()}
              readOnly
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`name-${user.id}`}>Full Name</Label>
            <Input
              id={`name-${user.id}`}
              type="text"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              placeholder="Your full name"
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-indigo-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`email-${user.id}`}>Email</Label>
            <Input
              id={`email-${user.id}`}
              type="email"
              value={user.email}
              readOnly
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`password-${user.id}`}>New Password</Label>
            <Input
              id={`password-${user.id}`}
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor={`notifications-${user.id}`}>Notifications</Label>
              <p className="text-sm text-slate-500">Receive email updates</p>
            </div>
            <Switch
              id={`notifications-${user.id}`}
              checked={notifications}
              onCheckedChange={(value: boolean) => setNotifications(value)}
            />
          </div>

          <CardFooter className="flex justify-end pt-4 gap-4">
            <Button
              type="submit"
              //               onClick={handleChange}
            >
              Save Changes
            </Button>
            <Button type="submit" onClick={handleRemove}>
              Delete
            </Button>
          </CardFooter>

          {/* Delete privileges */}
          {field && user.privileges !== "A" && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={() => setField(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-80 max-w-full z-10 flex flex-col gap-4 transition-all">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  No permission to delete user
                </h2>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
