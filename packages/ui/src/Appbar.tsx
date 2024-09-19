import { emitWarning } from "process";
import { Button } from "./button";
import Image from "next/image";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any,
    photo : any,
    altname : string
}
export const Appbar = ({
    user,
    onSignin,
    onSignout,
    photo,
    altname
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex justify-center">
            <div className="self-center">
            <Image src={photo} alt={altname} height={0} width={100} className="rounded"/>
            </div>
        </div>
        <div className="flex flex-col justify-center pt-2 ">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}
