import { Achievement } from "@/utils/data/user";

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Achievements</h2>
        <span className="text-sm text-slate-600">{achievements.length} total</span>
      </div>
      
      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <p className="text-sm text-slate-600">No achievements yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
              {/* Achievement Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              
              {/* Achievement Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      {achievement.link ? (
                        <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
                          {achievement.title}
                          <svg className="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        achievement.title
                      )}
                    </h3>
                    {achievement.description && (
                      <p className="text-sm text-slate-600 leading-relaxed">{achievement.description}</p>
                    )}
                  </div>
                  {achievement.date && (
                    <span className="flex-shrink-0 text-xs text-slate-500">
                      {new Date(achievement.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
