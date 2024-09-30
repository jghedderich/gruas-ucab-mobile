import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function SuccessScreen() {
  return (
    <Section
      title="Buen trabajo!"
      subtitle="La orden ha sido marcada como completada."
    >
      <LinkButton href={'/'} text="Continuar" />
    </Section>
  );
}
