'use client';

import { DealSplitForm } from "@/components/deals/deal-split-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";
import { useDealByIdQuery } from "@/hooks/deals/useDealQuery";
import { useDealSplitMutation } from "@/hooks/deals/useDealSplitMutation";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function NewSplitPage() {
    const router = useRouter();
    const { id } = useParams();

    const { data: deal, isLoading } = useDealByIdQuery(id as string);

    const mutation = useDealSplitMutation();

    const parentId = deal?.id;

    if (isLoading) return <div><Loader /></div>;
    if (!deal) return <div>No Deal Found</div>;
    return (
        <Container>
            <div className="mb-6 flex items-center gap-3">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={18} />
                </Button>

                <h1 className="text-2xl font-bold">Create Deal Split</h1>
            </div>
            <DealSplitForm
                parentId={parentId}
                onSubmit={mutation.mutate}
                isSubmitting={mutation.isPending} />
        </Container>
    );
}