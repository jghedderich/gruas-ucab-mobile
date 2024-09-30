import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function DestinyScreen() {
  return (
    <Section
      title="Diríjase al destino"
      subtitle="Revise la dirección en el mapa y consulte con el cliente para obtener más información."
    >
      <LinkButton href={'/orders/success'} text="He llegado al destino" />
    </Section>
  );
}
