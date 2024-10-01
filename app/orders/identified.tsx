import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import { View, StyleSheet, Image } from 'react-native';

export default function IdentifiedScreen() {
  return (
    <Section
      title="¿Desea agregar costos adicionales?"
      subtitle="Puede solicitar costos adicionales o proceder a realizar el servicio. Estos deberán ser aprobados por el operador de cabina."
      footer={
        <View style={styles.buttonContainer}>
          <LinkButton
            href={'/orders/request-costs'}
            text="Solicitar costos"
            variant="outline"
          />
          <LinkButton
            href={'/orders/destiny'}
            text="Realizar servicio"
            variant="default"
          />
        </View>
      }
    >
      <Image
        source={require('@/assets/images/negocio.png')}
        style={styles.image}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    marginTop: 36,
  },
});
