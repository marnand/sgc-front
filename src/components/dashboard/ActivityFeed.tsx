import { ActivityItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="border border-border dark:border-border">
      <CardHeader className="px-4 py-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium text-base">Atividades Recentes</CardTitle>
        <a href="#" className="text-sm text-primary dark:text-primary-foreground hover:underline">
          Ver todas
        </a>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {/* Line connecting timeline items */}
                  {index < activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  )}
                  
                  <div className="relative flex space-x-3">
                    {/* Activity icon */}
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full ${activity.iconBgColor} flex items-center justify-center ring-8 ring-white dark:ring-gray-800`}
                        dangerouslySetInnerHTML={{ __html: activity.icon }}
                      />
                    </div>
                    
                    {/* Activity content */}
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300" 
                           dangerouslySetInnerHTML={{ __html: activity.title }} 
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-right text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <time dateTime={activity.timestamp}>
                          {formatDateTime(activity.timestamp)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
