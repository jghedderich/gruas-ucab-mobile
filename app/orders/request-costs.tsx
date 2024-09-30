import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';

export default function RequestCostsScreen() {
  return (
    <Section
      title="Agregar costos adicionales"
      subtitle="Reporte todos los costos adicionales requeridos para realizar el servicio. Estos deberan ser aprobados por el operador de cabina."
    >
      <LinkButton href={'/orders/costs-status'} text="Enviar solicitud" />
    </Section>
  );
}
