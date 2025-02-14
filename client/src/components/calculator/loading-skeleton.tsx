import { Card, CardContent } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="w-[300px] h-[200px] bg-gray-200 rounded-full mx-auto" />
          <div className="mt-4">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
