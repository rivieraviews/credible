import api from "../utils/api";

export const deleteCardById = async (id: string) => {
    return api.delete(`/cards/${id}`);
}