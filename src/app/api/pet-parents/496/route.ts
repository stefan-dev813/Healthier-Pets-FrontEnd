import { NextRequest, NextResponse } from "next/server";

import { getPetParentsClinic } from "@/utils/funcs";

interface Parent {
    id: number,
    clinic_id : number,
    full_name: string,
    email: string,
    phone: string,
    created_at: string,
}

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const { token, clinic_id }= body;

        const petParents = await getPetParentsClinic(token, clinic_id);

        const simplifyParents = (data: Array<Parent>) => {
            return data.map(parent => ({
                id: parent.id,
                clinic_id: parent.clients[0].clinic_id,
                full_name: parent.full_name,
                email: parent.email,
                phone: parent.phone,
                created_at: parent.created_at
            }))
        };

        const newParents = simplifyParents(petParents); 
        console.log(newParents);

        return NextResponse.json({ petParents: newParents });

    } catch (err) {
        console.error("Get Pet-Parents Failed : ", err)
    }
}