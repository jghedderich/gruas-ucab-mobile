import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function CostsStatusScreen() {
  return (
    <Section
      title="Su solicitud esta siendo evaluada"
      subtitle="El operador de cabina va a revisar su solicitud y podrá aprobarla o denegarla."
    >
      <LinkButton href={'/orders/destiny'} text="Realizar servicio" />
    </Section>
  );
}
