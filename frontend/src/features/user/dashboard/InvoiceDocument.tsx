import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import vision_logo from '@/assets/auth/vison_logo_black_png.png'

const styles = StyleSheet.create({
    page: {
        padding: '20px', 
        fontSize: 12,
        fontFamily: 'Helvetica',
        color: '#333',
        backgroundColor: '#f9f9f9',
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        width: 80, 
        marginBottom: 10,
        alignSelf: 'center', 
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4a90e2',
        textAlign: 'center',
    },
    companyDetails: {
        marginBottom: 15,
        textAlign: 'center',
    },
    section: {
        marginBottom: 15,
    },
    table: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden', 
    },
    tableHeader: {
        backgroundColor: '#4a90e2',
        color: '#fff',
        padding: 8,
        flexDirection: 'row',
        textAlign: 'center', 
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 8,
        textAlign: 'center', 
    },
    tableCell: {
        flex: 1,
        textAlign: 'left',
        padding: 5,
    },
    tableCellHeader: {
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 10,
        color: '#555',
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        textAlign: 'center',
    },
    terms: {
        fontSize: 10,
        color: '#555',
        marginTop: 20,
    },
});

const InvoiceDocument = ({ invoice }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Logo and Header */}
            <View style={{ textAlign: 'center', marginBottom: 20 }}>
                <Image
                    src={vision_logo} 
                    style={styles.logo}
                />
                <Text style={styles.header}>Invoice</Text>
                <Text style={styles.companyDetails}>
                    Vision Inc. | 123 Innovation Way, Calicut, IN | +91 987 654 321
                </Text>
            </View>

            {/* User Details and Invoice Info */}
            <View style={styles.section}>
                <Text>User Email: {invoice?.userEmail || 'N/A'}</Text>
                <Text>Invoice Code: {invoice?.invoiceCode || 'N/A'}</Text>
                <Text>Status: {invoice?.status || 'N/A'}</Text>
                <Text>{invoice?.type==='course_purchase'?'Course Id: ':'Mentor Id: '} {invoice?.type==='course_purchase'?invoice?.courseId:invoice?.mentorId || 'N/A'}</Text>
                <Text>Date: {invoice?.createdAt ? new Date(invoice?.createdAt).toISOString().split('T')[0] : 'N/A'}</Text>
            </View>

            {/* Table Section */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCell, styles.tableCellHeader]}>Quantity</Text>
                    <Text style={[styles.tableCell, styles.tableCellHeader]}>Unit Price</Text>
                    <Text style={[styles.tableCell, styles.tableCellHeader]}>Total</Text>
                </View>

                {/* Table Row */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>1</Text>
                    <Text style={styles.tableCell}>₹ {invoice?.amount || 0}</Text>
                    <Text style={styles.tableCell}>₹ {invoice?.amount || 0}</Text>
                </View>
            </View>

            {/* Total Amount */}
            <View style={[styles.section, { marginTop: 20 }]}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                    Grand Total: ₹ {invoice?.amount || 0}
                </Text>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.terms}>
                <Text>Terms and Conditions:</Text>
                <Text>
                    - Please ensure that the invoice code is referenced for any correspondence.
                </Text>
                <Text>- This is a computer-generated invoice and does not require a signature.</Text>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                Thank you for choosing Vision! We appreciate your business.
            </Text>
        </Page>
    </Document>
);

export default InvoiceDocument;
