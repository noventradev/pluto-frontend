import DealDetailClient from '@/components/deals/deal-detail-client';
import { Container } from '@/components/ui/container';

const DealDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Container>
      <DealDetailClient id={id} />
    </Container>
  );
};

export default DealDetailPage;
