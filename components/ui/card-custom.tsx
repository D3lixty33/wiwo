import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardDataProps {
  tipData?: string;
  value?: number;
}

const CardData = ({ tipData, value }: CardDataProps) => {

  return (
    <>
      {tipData === "T" && (
        <Card className="w-full max-w-md bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <CardHeader>
            <CardTitle>TOTAL</CardTitle>
            <CardDescription>Total of all the expenses: {value?.toString() ?? "NaN"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6"></div>
            </form>
          </CardContent>
          {/*
      <CardFooter className='flex-col gap-2'>
        <Button type='submit' className='w-full'>
          Login
        </Button>
        <Button variant='outline' className='w-full'>
          Continue with Google
        </Button>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <a href='#' className='underline underline-offset-4'>
            Sign up
          </a>
        </div>
      </CardFooter>
      */}
        </Card>
      )}

      {tipData === "N" && (
        <Card className="w-full max-w-md bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <CardHeader>
            <CardTitle>NETTO</CardTitle>
            <CardDescription>Marked &quot;N&quot; expenses : {value?.toString() ?? "NaN"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6"></div>
            </form>
          </CardContent>
        </Card>
      )}

      {tipData === "C" && (
        <Card className="w-full max-w-md bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <CardHeader>
            <CardTitle>CALC</CardTitle>
            <CardDescription>Total of all the expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6"></div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CardData;
