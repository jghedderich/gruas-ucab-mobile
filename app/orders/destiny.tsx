import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import MapComponent from '@/components/orders/MapComponent';

export default function DestinyScreen() {
  return (
    <Section
      title="Realice el servicio"
      subtitle="Revise la dirección del destino en el mapa y consulte con el cliente para obtener más información."
      footer={
        <LinkButton href={'/orders/success'} text="He llegado al destino" />
      }
    >
      <MapComponent latitude={10.0} longitude={10.0} />
    </Section>
  );
}
