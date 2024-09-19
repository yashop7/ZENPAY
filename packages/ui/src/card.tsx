export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border rounded-md p-5 h-fit m-1 shadow ">
      <div className="text-xl pb-3 border-b-2 font-medium">
        {title}
      </div>
      <div className="">{children}</div>
    </div>
  );
}
//here you will see that we have used h-fit