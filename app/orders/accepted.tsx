import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function AcceptedOrderScreen() {
  return (
    <Section
      title="Orden Aceptada"
      subtitle="Diríjase a la ubicación del cliente y confirme su identidad."
    >
      <LinkButton
        href={'/orders/identified'}
        text="He llegado a la ubicación"
      />
    </Section>
  );
}
