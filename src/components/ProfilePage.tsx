import { useState } from "react";
import imgChatGptImageOct42025032217Pm1 from "figma:asset/236a27e3a7b1aa9454a20fe24fa9e1b04d2d02f2.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckCircle2, User, Settings, Bell } from "lucide-react";
import { Header } from "./Header";

interface ProfilePageProps {
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "profile",
  ) => void;
}

interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  cookingLevel: string;
  dietaryRestrictions: string[];
  favoritesCuisine: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  recipeUpdates: boolean;
  expirationAlerts: boolean;
  weeklyReports: boolean;
}

export function ProfilePage({
  onNavigate,
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Home cook passionate about experimenting with new recipes and keeping an organized kitchen!",
    cookingLevel: "intermediate",
    dietaryRestrictions: ["vegetarian"],
    favoritesCuisine: "italian",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    recipeUpdates: true,
    expirationAlerts: true,
    weeklyReports: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | null
  >(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      console.log("Profile updated:", profileData);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      console.log("Settings updated:", notifications);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setProfileData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  return (
    <div
      className="bg-white relative size-full min-h-screen"
      data-name="PROFILE PAGE"
    >
      <Header currentPage="profile" onNavigate={onNavigate} />
      {/* Background Image */}
      <div
        className="absolute h-[1292px] left-[49px] top-[0px] w-[861px]"
        data-name="Background Image"
      >
        <img
          alt="Kitchen appliances background"
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
          src={imgChatGptImageOct42025032217Pm1}
        />
      </div>

      {/* Profile Form Container */}
      <div className="absolute left-[873px] top-[310px] w-[479px]">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Headers */}
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#c62003] data-[state=active]:text-white flex items-center gap-2"
            >
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-[#c62003] data-[state=active]:text-white flex items-center gap-2"
            >
              <Settings size={16} />
              Kitchen
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#c62003] data-[state=active]:text-white flex items-center gap-2"
            >
              <Bell size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h1
              className="font-['Fraunces:SemiBold',_sans-serif] text-[45px] text-black leading-[normal]"
              style={{
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              }}
            >
              Your Profile
            </h1>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="profile-name"
                  className="text-[24px] text-black"
                >
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      fullName: e.target.value,
                    })
                  }
                  className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="profile-email"
                  className="text-[24px] text-black"
                >
                  Email
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    })
                  }
                  className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="profile-bio"
                  className="text-[24px] text-black"
                >
                  About You
                </Label>
                <Textarea
                  id="profile-bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      bio: e.target.value,
                    })
                  }
                  className="min-h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6 py-4"
                  placeholder="Tell us about your cooking journey..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[380px] h-[70px] bg-[#c62003] hover:bg-[#a01802] text-white rounded-[30px] text-[26px] font-['Fraunces:SemiBold',_sans-serif]"
                style={{
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                {isSubmitting ? "Updating..." : "Save Profile"}
              </Button>
            </form>
          </TabsContent>

          {/* Kitchen Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <h1
              className="font-['Fraunces:SemiBold',_sans-serif] text-[45px] text-black leading-[normal]"
              style={{
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              }}
            >
              Kitchen Preferences
            </h1>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[24px] text-black">
                  Cooking Level
                </Label>
                <Select
                  value={profileData.cookingLevel}
                  onValueChange={(value) =>
                    setProfileData({
                      ...profileData,
                      cookingLevel: value,
                    })
                  }
                >
                  <SelectTrigger className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[24px] text-black">
                  Favorite Cuisine
                </Label>
                <Select
                  value={profileData.favoritesCuisine}
                  onValueChange={(value) =>
                    setProfileData({
                      ...profileData,
                      favoritesCuisine: value,
                    })
                  }
                >
                  <SelectTrigger className="h-[99px] border-[3px] border-black rounded-[10px] bg-white text-[18px] px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-[24px] text-black">
                  Dietary Restrictions
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "paleo"].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Switch
                        id={restriction}
                        checked={profileData.dietaryRestrictions.includes(restriction)}
                        onCheckedChange={() => toggleDietaryRestriction(restriction)}
                      />
                      <Label htmlFor={restriction} className="text-[16px] text-black capitalize">
                        {restriction.replace("-", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[380px] h-[70px] bg-[#c62003] hover:bg-[#a01802] text-white rounded-[30px] text-[26px] font-['Fraunces:SemiBold',_sans-serif]"
                style={{
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                {isSubmitting ? "Updating..." : "Save Preferences"}
              </Button>
            </form>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <h1
              className="font-['Fraunces:SemiBold',_sans-serif] text-[45px] text-black leading-[normal]"
              style={{
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              }}
            >
              Notification Settings
            </h1>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border-[3px] border-black rounded-[10px] bg-white">
                  <div>
                    <h3 className="text-[20px] text-black">Email Notifications</h3>
                    <p className="text-[14px] text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-[3px] border-black rounded-[10px] bg-white">
                  <div>
                    <h3 className="text-[20px] text-black">Recipe Updates</h3>
                    <p className="text-[14px] text-gray-600">Get notified about new recipes</p>
                  </div>
                  <Switch
                    checked={notifications.recipeUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        recipeUpdates: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-[3px] border-black rounded-[10px] bg-white">
                  <div>
                    <h3 className="text-[20px] text-black">Expiration Alerts</h3>
                    <p className="text-[14px] text-gray-600">Alerts when ingredients are expiring</p>
                  </div>
                  <Switch
                    checked={notifications.expirationAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        expirationAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-[3px] border-black rounded-[10px] bg-white">
                  <div>
                    <h3 className="text-[20px] text-black">Weekly Reports</h3>
                    <p className="text-[14px] text-gray-600">Summary of your kitchen activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        weeklyReports: checked,
                      })
                    }
                  />
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[380px] h-[70px] bg-[#c62003] hover:bg-[#a01802] text-white rounded-[30px] text-[26px] font-['Fraunces:SemiBold',_sans-serif]"
                style={{
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                {isSubmitting ? "Updating..." : "Save Settings"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}