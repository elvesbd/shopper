import { toast } from "react-toastify";

export const handleError = (error: any) => {
	const errorDescription = error.response?.data?.error_description;

	if (errorDescription) {
		toast.error(errorDescription);
	} else {
		toast.error("Erro desconhecido");
	}
};
