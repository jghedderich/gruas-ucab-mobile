import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import { Image, StyleSheet } from 'react-native';

export default function CostsStatusScreen() {
  return (
    <Section
      title="Su solicitud ha sido enviada"
      subtitle="El operador de cabina va a revisar su solicitud y podrá aprobarla o denegarla."
      footer={<LinkButton href={'/orders/destiny'} text="Realizar servicio" />}
    >
      <Image
        source={require('@/assets/images/ingeniero-informatico.png')}
        style={styles.image}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginHorizontal: 'auto',
    marginTop: 36,
  },
});
