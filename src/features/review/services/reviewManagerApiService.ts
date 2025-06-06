import { IReviewResponseDTO } from "@delatte/shared/dtos";
import { axiosInstance } from "src/lib/axios/axiosInstance";

export const getReviewsByManager = async (
  managerId: string
): Promise<IReviewResponseDTO[]> => {
  const response = await axiosInstance.get(`/reviews/managers/${managerId}`);
  return response.data;
};