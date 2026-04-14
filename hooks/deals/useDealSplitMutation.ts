import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDealSplitDTO } from "@/app/lib/types/deal-split.types";
import { useRouter } from "next/navigation";
import { dealSplitApi } from "@/service/deals.service";


export function useDealSplitMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: CreateDealSplitDTO }) => dealSplitApi.create(id, data),
        // onMutate: ({ id, data }) => {
        //     console.log(id, data);
        // },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deals'] });
            router.back();
        },
    });
}