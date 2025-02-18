import { Metadata } from "next";
import ComponentPetParents from "@/components/pet-parents";

export const metadata: Metadata = {
    title: "Pet Parents Page",
};

const PetParentsPage = () => {
    return (
        <>
            <ComponentPetParents />
        </>
    );
}

export default PetParentsPage;