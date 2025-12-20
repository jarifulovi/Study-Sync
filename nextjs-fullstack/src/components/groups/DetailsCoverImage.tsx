import { getInitials } from "@/utils/formatter";
import { Globe, Lock, Users, Tag } from "lucide-react";

interface DetailsCoverImageProps {
  imageUrl: string | null;
  name: string;
  coverImage?: string | null;
  status: string;
  type: string;
  members: number;
}

export default function DetailsCoverImage({
  imageUrl,
  name,
  coverImage,
  status,
  type,
  members
}: DetailsCoverImageProps) {
  return (
    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={`${name} cover`} 
            className="h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full">
        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6">
          <div className="flex h-full flex-col justify-end pb-6 md:pb-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-6">
              {/* Avatar Container - Adjusted for mobile */}
              <div className="relative">
                <div className="h-20 w-20 md:h-32 md:w-32">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={name}
                      className="h-full w-full rounded-xl md:rounded-2xl border-3 md:border-4 border-white/90 shadow-xl md:shadow-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl md:rounded-2xl border-3 md:border-4 border-white/90 bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl md:shadow-2xl">
                      <span className="text-xl md:text-3xl font-semibold text-white">
                        {getInitials(name)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-3 md:space-y-4">
                {/* Group Name - Mobile optimized */}
                <h1 className="text-2xl font-bold text-white md:text-4xl">
                  {name}
                </h1>
                
                {/* Subtitle - Hidden on mobile */}
                <p className="hidden md:block max-w-2xl text-lg text-white/90">
                  A vibrant community of passionate individuals
                </p>

                {/* Metadata Bar - Stack on mobile */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/10 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm">
                    {status === "public" ? (
                      <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                    )}
                    <span className="text-xs md:text-sm font-medium capitalize text-white">
                      {status}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/10 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm">
                    <Tag className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                    <span className="text-xs md:text-sm font-medium capitalize text-white">
                      {type}
                    </span>
                  </div>

                  {/* Members Count */}
                  <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/10 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm">
                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                    <span className="text-xs md:text-sm font-medium text-white">
                      {members.toLocaleString()} members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}