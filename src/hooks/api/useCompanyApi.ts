import { useMutation, useQuery } from "@tanstack/react-query"

import { Company, CompanyControllerFindAllData, CompanyControllerFindOneData, type Options } from "@/api-generated"
import {
	companyControllerCreateMutation,
	companyControllerFindAllOptions,
	companyControllerFindAllQueryKey,
	companyControllerFindOneOptions,
	companyControllerFindOneQueryKey,
	companyControllerRemoveMutation,
	companyControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetCompanies = (queryOptions: Options<CompanyControllerFindAllData>) => {
	return {
		...useQuery({
			...companyControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: companyControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetCompany = (queryOptions: Options<CompanyControllerFindOneData>) => {
	return {
		...useQuery({
			...companyControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: companyControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateCompany = (onSuccess?: (data: Company) => void, onError?: (error: Error) => void) => {
	const mutationOptions = companyControllerCreateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useUpdateCompany = (onSuccess?: (data: Company) => void, onError?: (error: Error) => void) => {
	const mutationOptions = companyControllerUpdateMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

export const useDeleteCompany = (onSuccess?: (data: void) => void, onError?: (error: Error) => void) => {
	const mutationOptions = companyControllerRemoveMutation()
	return useMutation({ ...mutationOptions, onSuccess, onError })
}

type UseCompanyApiOptions = {
	query?: Options<CompanyControllerFindAllData>["query"]
	path?: Options<CompanyControllerFindOneData>["path"]
	onCreateSuccess?: (data: Company) => void
	onCreateError?: (error: Error) => void
	onUpdateSuccess?: (data: Company) => void
	onUpdateError?: (error: Error) => void
	onDeleteSuccess?: (data: void) => void
	onDeleteError?: (error: Error) => void
}

const useCompanyApi = ({
	query,
	path,
	onCreateSuccess,
	onCreateError,
	onUpdateSuccess,
	onUpdateError,
	onDeleteSuccess,
	onDeleteError,
}: UseCompanyApiOptions) => {
	const company = useGetCompany({ path: path! })
	const companies = useGetCompanies({ query: query! })
	const createCompany = useCreateCompany(onCreateSuccess, onCreateError)
	const updateCompany = useUpdateCompany(onUpdateSuccess, onUpdateError)
	const deleteCompany = useDeleteCompany(onDeleteSuccess, onDeleteError)

	return {
		company,
		companies,
		createCompany,
		updateCompany,
		deleteCompany,
	}
}

export default useCompanyApi
