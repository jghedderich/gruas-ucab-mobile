import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function IdentifiedScreen() {
  return (
    <Section
      title="Ha identificado al cliente?"
      subtitle="Puede proceder a realizar el servicio o solicitar costos adicionales. "
    >
      <LinkButton href={'/orders/request-costs'} text="Solicitar costos" />
      <LinkButton href={'/orders/destiny'} text="Realizar servicio" />
    </Section>
  );
}
