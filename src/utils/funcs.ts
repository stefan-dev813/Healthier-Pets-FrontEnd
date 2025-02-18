import axios from 'axios';

export const setAxiosConfig = (token: string) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
    }

    return config;
}

export const getPetParentsClinic = async (token: string, clinic_id: number) => {
    try {
        console.log(`${process.env.API_URL}/pet-parents?include=clients&filter[belongs_to_clinic]=${clinic_id}`);
        const config = setAxiosConfig(token);
        const response = await axios.get(`${process.env.API_URL}/pet-parents?include=clients&filter[belongs_to_clinic]=${clinic_id}`, config);
        
        return response.data.data;
    } catch (err ) {
        console.error('Failed!');
    }

}

