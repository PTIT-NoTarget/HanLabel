/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package proptit.hanlabel.Controller;
import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.apache.poi.xwpf.usermodel.*;
import org.apache.xmlbeans.XmlObject;
import org.apache.xmlbeans.XmlCursor;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTR;
import java.util.List;
import java.util.ArrayList;
import java.util.Calendar;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.swing.JCheckBox;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.printing.PDFPageable;
import org.apache.xmlbeans.XmlException;
import proptit.hanlabel.View.MainView;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JProgressBar;

public class Controller {
    private static Controller instance;
    private final String folderPath = "D:\\App\\HanLabel\\target\\";
    //private final String folderPath = "";
    
    private Controller(){
        
    }
    
    public static Controller getInstance() {
        if (instance == null) instance = new Controller();
        return instance;
    }
    
    public void replaceText(ArrayList<String> someWords, ArrayList<String> Replaced, String filePath, String outputPath) throws FileNotFoundException, IOException, XmlException{
        try (XWPFDocument document = new XWPFDocument(new FileInputStream(folderPath + filePath))) {
            for(int i = 0;i < someWords.size();i++){
                for (XWPFParagraph paragraph : document.getParagraphs()) {
                    XmlCursor cursor = paragraph.getCTP().newCursor();
                    cursor.selectPath("declare namespace w='http://schemas.openxmlformats.org/wordprocessingml/2006/main' .//*/w:txbxContent/w:p/w:r");
                    List<XmlObject> ctrsintxtbx = new ArrayList<>();
                    while(cursor.hasNextSelection()) {
                        cursor.toNextSelection();
                        XmlObject obj = cursor.getObject();
                        ctrsintxtbx.add(obj);
                    }
                    for (XmlObject obj : ctrsintxtbx) {
                        CTR ctr = CTR.Factory.parse(obj.xmlText());
                        XWPFRun bufferrun = new XWPFRun(ctr, (IRunBody)paragraph);
                        String text = bufferrun.getText(0);
                        if (text != null && text.contains(someWords.get(i))) {
                            text = text.replace(someWords.get(i), Replaced.get(i));
                            bufferrun.setText(text, 0);
                        }
                        obj.set(bufferrun.getCTR());
                    }
                }
            }
            
            try (FileOutputStream out = new FileOutputStream(folderPath + outputPath)) {
                document.write(out);
            }
        }
    }
    
    public String getYear(){
        int year = Calendar.getInstance().get(Calendar.YEAR);
        return String.format("%d", year) + " - " + String.format("%d", year + 1);
    }
    
    public String getGrade(JTextField jtf){
        String s = jtf.getText().trim();
        if(s.equals("")){
            return "null";
        }
        if(Character.isAlphabetic(s.charAt(1)) == true){
            return s.substring(0,1);
        }
        else{
            return s.substring(0,2);
        }
    }
    
    public void saveListNote(JTextField jtf,JTextArea jta) throws IOException{
        String filePath = folderPath + getGrade(jtf) + ".txt";
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath))) {
            String[] listNote = jta.getText().split("\n");
            for(String note : listNote){
                bufferedWriter.write(note.trim());
                bufferedWriter.newLine();
            }
            MainView.pushMsg("Bạn đã lưu thành công");
        }
    }
    
    public String getListNotefromFile(JTextField jtf) throws FileNotFoundException, IOException{
        String filePath = folderPath + getGrade(jtf) + ".txt";
        String listNote;
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath))) {
            listNote = "";
            String line;
            while((line = bufferedReader.readLine()) != null){
                listNote += line + "\n";
                System.out.println(line);
            }
        }
        return listNote;
    }
    
    public void showListNote(JCheckBox jcb,JTextArea jta,JTextField jtf) throws IOException, FileNotFoundException, XmlException{
        if(jcb.isSelected()){
            jta.setText(getListNotefromFile(jtf));
        }
        else{
            jta.setText("");
        }
    }
    
    public void convertDocxToPdf(ArrayList <String> inputPaths, String outputPath) throws FileNotFoundException, IOException, DocumentException{
        String tempPath = "temp.pdf";
        Document document = new Document();
        PdfCopy copy = new PdfCopy(document, new FileOutputStream(outputPath));
        document.open();
        try (OutputStream tempStream = new FileOutputStream(tempPath)) {
            IConverter converter = LocalConverter.builder().build();
            for (String inputPath : inputPaths) {
                File inputWord = new File(inputPath);
                try (InputStream docxInputStream = new FileInputStream(inputWord)) {
                    converter.convert(docxInputStream).as(DocumentType.DOCX).to(tempStream,false).as(DocumentType.PDF).execute();
                }
                PdfReader reader = new PdfReader(tempPath);
                copy.addPage(copy.getImportedPage(reader, 1));
                reader.close();
            }
            document.close();
            copy.close();
            converter.shutDown();
        }
    }
    
    public void printPDFfile(JTextField schoolF, JTextField nameF, JTextField gradeF, JCheckBox book, JCheckBox note, JProgressBar jpb) throws IOException, PrinterException, FileNotFoundException, XmlException, DocumentException{
//        jpb.setStringPainted(true);
//        jpb.setValue(0);
        if(schoolF.getText().equals("")){
            MainView.pushMsg("Vui lòng nhập tên trường.");
            return;
        }
        if(nameF.getText().equals("")){
            MainView.pushMsg("Vui lòng nhập tên học sinh.");
            return;
        }
        if(gradeF.getText().equals("")){
            MainView.pushMsg("Vui lòng nhập lớp.");
            return;
        }
        if(!book.isSelected() && !note.isSelected()){
            MainView.pushMsg("Vui lòng chọn loại nhãn để in.");
            return;
        }
        prepareDocxFile(schoolF, nameF, gradeF,book, note);
        
        String filePath = "output.pdf";
        try (PDDocument pdDocument = PDDocument.load(new File(folderPath + filePath))) {
            PrintService printService = PrintServiceLookup.lookupDefaultPrintService();            
            PrinterJob printerJob = PrinterJob.getPrinterJob();
            printerJob.setPrintService(printService);
            if (printerJob.printDialog()) {
                for (int i = 0; i < pdDocument.getNumberOfPages(); i++) {
                    printerJob.setPageable(new PDFPageable(pdDocument));
                    printerJob.print();
                }
            }
        }
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
        jpb.setValue(0); 
        File file = new File(folderPath + filePath);
        file.delete();
    }
    
    public String ChuanHoaXau(String s){
        String ans = "";
        String[] listS = s.trim().split(" ");
        for(int i = 0;i < listS.length;i++){
            ans += listS[i].substring(0,1).toUpperCase() + listS[i].substring(1).toLowerCase() + " ";
        }
        return ans.trim();
    }
    
    public void prepareDocxFile(JTextField schoolF, JTextField nameF, JTextField gradeF, JCheckBox book, JCheckBox note) throws IOException, FileNotFoundException, XmlException, DocumentException{        
        ArrayList<String> someWords = new ArrayList<>();
        ArrayList<String> Replaced = new ArrayList<>();
        ArrayList<String> inputPaths = new ArrayList<>();
        someWords.add("SCHOOLTEMPLATE"); Replaced.add("TRƯỜNG " + schoolF.getText().trim().toUpperCase());
        someWords.add("ClassTemplate"); Replaced.add(gradeF.getText().trim().toUpperCase());
        someWords.add("NameTeamplate"); Replaced.add(ChuanHoaXau(nameF.getText()));
        someWords.add("YearTemplate"); Replaced.add(getYear());
        int page = 0;
        String outputPath = "output";
        if(book.isSelected()){
            page++;
            replaceText(someWords, Replaced, "book.docx",outputPath + String.format("%d", page) + ".docx");
            inputPaths.add(folderPath + "output1.docx");
        }
        if (note.isSelected()){
            
        }
        convertDocxToPdf(inputPaths, folderPath + "output.pdf");
    }
    
    public void delTextArea(JTextArea jta){
        jta.setText("");
        jta.setEditable(true);
    }
    
    public void limitLineTextArea(JTextArea jta){
        
    }
}
