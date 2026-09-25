import { jsPDF } from 'jspdf';

interface TicketData {
  folio: string;
  orderMode: 'pickup' | 'delivery';
  sizeName: string;
  sizeLabel: string;
  baseName: string;
  cremaName: string;
  aderezoName: string;
  toppings: string[];
  notes?: string;
  total: number;
}

export const generatePdfTicket = async (data: TicketData): Promise<void> => {
  try {
    // Format: Comprobante / Orden de Preparacion (80mm width thermal/boutique comanda)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 235],
    });

    const pageWidth = 80;
    const margin = 6;
    const contentWidth = pageWidth - margin * 2;
    let y = 8;

    // Helper: horizontal dashed line
    const drawDashedLine = (currentY: number) => {
      doc.setDrawColor(170, 170, 170);
      doc.setLineDashPattern([1.2, 1.2], 0);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      doc.setLineDashPattern([], 0); // reset
    };

    // Helper: horizontal solid line
    const drawSolidLine = (currentY: number, color = 200) => {
      doc.setDrawColor(color, color, color);
      doc.line(margin, currentY, pageWidth - margin, currentY);
    };

    // Header Background Box
    doc.setFillColor(255, 242, 246);
    doc.roundedRect(margin, y, contentWidth, 31, 2, 2, 'F');

    // Business Name: Freséame 🍓
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 75, 139); // #FF4B8B
    doc.text('FRESEAME', pageWidth / 2, y + 6.5, { align: 'center' });

    // Subtitle: Comprobante de Pedido
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(43, 26, 36);
    const serviceSub = data.orderMode === 'pickup'
      ? 'COMPROBANTE DE PEDIDO - SERVICIO PICK-UP'
      : 'COMPROBANTE DE PEDIDO - ORDEN A DOMICILIO';
    doc.text(serviceSub, pageWidth / 2, y + 11.5, { align: 'center' });

    // Branch / Sucursal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(72, 201, 176); // Mint
    doc.text('Sucursal: Plaza Patio Claveria', pageWidth / 2, y + 16, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(90, 80, 85);
    doc.text('Calle Egipto 142, Col. Claveria, Azcapotzalco, CDMX', pageWidth / 2, y + 20, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(220, 60, 110);
    doc.text('Punto de recogida: En medio de la plaza, junto a McCarthy\'s', pageWidth / 2, y + 24, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(90, 80, 85);
    doc.text('Horario de entrega: Lunes a Domingo de 11:00 AM a 11:00 PM', pageWidth / 2, y + 28, { align: 'center' });
    y += 34;

    drawDashedLine(y);
    y += 5;

    // Control Data Box
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(margin, y, contentWidth, 21, 1.5, 1.5, 'F');

    // Folio de Pedido destacado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(255, 75, 139);
    doc.text(`FOLIO DE PEDIDO: #${data.folio}`, margin + 2.5, y + 5.5);

    // Fecha y hora exacta de registro
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeFormatted = now.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`Registro: ${dateFormatted} - ${timeFormatted} hrs`, margin + 2.5, y + 10);

    // Modalidad
    const modalidadText =
      data.orderMode === 'pickup'
        ? 'Recoger en Sucursal (Pick-Up Claveria)'
        : 'Entrega a Domicilio';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(43, 26, 36);
    doc.text(`Modalidad: ${modalidadText}`, margin + 2.5, y + 14.5);

    // Estado de la orden (No de pago)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(217, 83, 79); // Highlighted state
    const estadoText = 'PEDIDO REGISTRADO / PAGO PENDIENTE EN CAJA';
    doc.text(estadoText, margin + 2.5, y + 18.5);
    y += 24;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(120, 100, 110);
    doc.text('(Efectivo / Tarjeta al recoger en barra)', pageWidth / 2, y, { align: 'center' });
    y += 3.5;

    drawDashedLine(y);
    y += 5;

    // Desglose de la Orden
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 75, 139);
    doc.text('ORDEN DE PREPARACION EN COCINA', margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(45, 40, 45);

    // Tamaño de vaso
    doc.setFont('helvetica', 'bold');
    doc.text('Tamano:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.sizeName} (${data.sizeLabel})`, margin + 14, y);
    y += 4;

    // Base seleccionada
    doc.setFont('helvetica', 'bold');
    doc.text('Base:', margin, y);
    doc.setFont('helvetica', 'normal');
    const baseLines = doc.splitTextToSize(data.baseName, contentWidth - 14);
    doc.text(baseLines, margin + 14, y);
    y += baseLines.length * 3.5;

    // Crema artesanal elegida
    doc.setFont('helvetica', 'bold');
    doc.text('Crema:', margin, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 75, 139);
    const cremaLines = doc.splitTextToSize(data.cremaName, contentWidth - 14);
    doc.text(cremaLines, margin + 14, y);
    doc.setTextColor(45, 40, 45);
    y += cremaLines.length * 3.5;

    // Aderezo
    doc.setFont('helvetica', 'bold');
    doc.text('Aderezo:', margin, y);
    doc.setFont('helvetica', 'normal');
    const aderezoLines = doc.splitTextToSize(data.aderezoName, contentWidth - 15);
    doc.text(aderezoLines, margin + 15, y);
    y += aderezoLines.length * 3.5;

    // Toppings con recordatorio de barra libre
    doc.setFont('helvetica', 'bold');
    doc.text(`Toppings Iniciales (${data.toppings.length}):`, margin, y);
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const toppingsFormatted = data.toppings.length > 0 ? data.toppings.join(' • ') : 'Personalizacion libre al recoger';
    const toppingLines = doc.splitTextToSize(toppingsFormatted, contentWidth);
    doc.text(toppingLines, margin, y);
    y += toppingLines.length * 3.4;

    // Recordatorio barra libre en sucursal
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(72, 160, 140);
    doc.text('* Recuerda: En sucursal nuestra barra de toppings es ilimitada.', margin, y);
    y += 4;

    // Notas del cliente
    if (data.notes && data.notes.trim()) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.5);
      doc.setTextColor(110, 110, 110);
      const notesLines = doc.splitTextToSize(`Instrucciones: "${data.notes.trim()}"`, contentWidth);
      doc.text(notesLines, margin, y);
      y += notesLines.length * 3.2;
    }

    y += 1.5;
    drawSolidLine(y, 160);
    y += 4.5;

    // Total a liquidar en caja
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(43, 26, 36);
    doc.text('TOTAL A LIQUIDAR EN CAJA:', margin, y);

    doc.setFontSize(12);
    doc.setTextColor(255, 75, 139);
    doc.text(`$${data.total} MXN`, pageWidth - margin, y, { align: 'right' });
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(120, 120, 120);
    doc.text('(IVA Incluido • Pago directo en mostrador)', margin, y);
    y += 4.5;

    drawDashedLine(y);
    y += 4.5;

    // Indicaciones para el Cliente
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(43, 26, 36);
    doc.text('INDICACIONES PARA EL CLIENTE:', margin, y);
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(60, 60, 60);

    const ind1 = '- Muestra este folio en barra al llegar para recibir tu pedido sin hacer fila.';
    const ind1Lines = doc.splitTextToSize(ind1, contentWidth);
    doc.text(ind1Lines, margin, y);
    y += ind1Lines.length * 3.2;

    const ind2 = '- El pago se liquida directamente en mostrador al recoger tu orden.';
    const ind2Lines = doc.splitTextToSize(ind2, contentWidth);
    doc.text(ind2Lines, margin, y);
    y += ind2Lines.length * 3.2;

    const ind3 = '- Te enviaremos actualizacion de preparacion via WhatsApp.';
    const ind3Lines = doc.splitTextToSize(ind3, contentWidth);
    doc.text(ind3Lines, margin, y);
    y += ind3Lines.length * 3.2 + 2;

    // WhatsApp de atención
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(37, 211, 102);
    doc.text('WhatsApp de Atencion: +52 773 172 7582', pageWidth / 2, y, { align: 'center' });
    y += 3.5;

    // Footer note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(140, 140, 140);
    doc.text('Comprobante digital para uso en sucursal Patio Claveria.', pageWidth / 2, y, { align: 'center' });

    // Download with filename Comprobante_Pedido_Freseame_[FOLIO].pdf
    const cleanFolio = data.folio.replace(/[^a-zA-Z0-9_-]/g, '');
    const fileName = `Comprobante_Pedido_Freseame_${cleanFolio}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error generating Comprobante de Pedido PDF:', error);
    throw error;
  }
};
