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
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Image;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JProgressBar;
import javax.swing.border.Border;
import javax.swing.text.AbstractDocument;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.DocumentFilter;

public class Controller {
    private static Controller instance;
    private final String folderPath = ".\\target\\";
    private ArrayList<JLabel> jLabels = new ArrayList<>();
    private String bookPath;
    private String notePath;
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
        String tempPath = folderPath + "temp.pdf";
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
    
    public Boolean exceptionHandling(JTextField schoolF, JTextField gradeF){
        String school = schoolF.getText();
        String grade = gradeF.getText();
        Boolean check = false;
        if(school.length() < 4){
            MainView.pushMsg("Bạn đã nhập sai tên trường.");
            return false;
        }
        if(grade.length() < 1){
            MainView.pushMsg("Bạn đã nhập sai lớp.");
            return false;
        }
        if(school.substring(0, 4).toUpperCase().equals("THPT")){
            check = true;
            if(grade.length() < 2){
                MainView.pushMsg("Bạn đã nhập sai lớp.");
                return false;
            }
            if(Character.isAlphabetic(grade.charAt(1)) || Character.isAlphabetic(grade.charAt(0))){
                MainView.pushMsg("Bạn đã nhập sai lớp.");
                return false;
            }
            int tmp = Integer.parseInt(grade.substring(0, 2));
            if(tmp < 10 || tmp > 12){
                MainView.pushMsg("Cấp bậc THPT chỉ có lớp 10, 11, 12.");
                return false;
            }
        }
        else if(school.substring(0, 4).toUpperCase().equals("THCS")){
            check = true;
            if(Character.isAlphabetic(grade.charAt(0))){
                MainView.pushMsg("Bạn đã nhập sai lớp.");
                return false;
            }
            int tmp = Integer.parseInt(grade.substring(0, 1));
            if(tmp < 6 || tmp > 9){
                MainView.pushMsg("Cấp bậc THCS chỉ có lớp 6, 7, 8, 9.");
                return false;
            }
        }
        else if(school.substring(0, 2).toUpperCase().equals("TH")){
            check = true;
            if(Character.isAlphabetic(grade.charAt(0))){
                MainView.pushMsg("Bạn đã nhập sai lớp.");
                return false;
            }
            int tmp = Integer.parseInt(grade.substring(0, 1));
            if(tmp < 1 || tmp > 5){
                MainView.pushMsg("Cấp bậc TH chỉ có lớp 1, 2, 3, 4, 5.");
                return false;
            }
        }
        return check;
    }
    
    public void printPDFfile(JTextField schoolF, JTextField nameF, JTextField gradeF, JCheckBox book, JCheckBox note, JProgressBar jpb, JTextArea jta) throws IOException, PrinterException, FileNotFoundException, XmlException, DocumentException, InterruptedException{
        jpb.setValue(60);
        if(bookPath == null || notePath == null){
            MainView.pushMsg("Bạn chưa chọn loại nhãn vở");
            return;
        }
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
        if(exceptionHandling(schoolF, gradeF) == false) return;
        MainView.pushMsg("Đang in .... Bấm OK và chờ.");
        prepareDocxFile(schoolF, nameF, gradeF,book, note, jta,jpb);
        String filePath = "output.pdf";
        try (PDDocument pdDocument = PDDocument.load(new File(folderPath + filePath))) {
            PrintService printService = PrintServiceLookup.lookupDefaultPrintService();            
            PrinterJob printerJob = PrinterJob.getPrinterJob();
            printerJob.setPrintService(printService);
            if (printerJob.printDialog()) {
                for (int i = 0; i < pdDocument.getNumberOfPages(); i++) {
                    printerJob.setPageable(new PDFPageable(pdDocument));
                }
                printerJob.print();
            }
        }
        MainView.pushMsg("Đã xong.");
        jpb.setValue(0);
        nameF.setText("");
        schoolF.setText("");
        gradeF.setText("");
        book.setSelected(false);
        note.setSelected(false);
    }
    
    public String ChuanHoaXau(String s){
        String ans = "";
        String[] listS = s.trim().split(" ");
        for(int i = 0;i < listS.length;i++){
            ans += listS[i].substring(0,1).toUpperCase() + listS[i].substring(1).toLowerCase() + " ";
        }
        return ans.trim();
    }
    
    public void prepareDocxFile(JTextField schoolF, JTextField nameF, JTextField gradeF, JCheckBox book, JCheckBox note, JTextArea jta, JProgressBar jpb) throws IOException, FileNotFoundException, XmlException, DocumentException{        
        ArrayList<String> someWords = new ArrayList<>();
        ArrayList<String> Replaced = new ArrayList<>();
        ArrayList<String> inputPaths = new ArrayList<>();
        someWords.add("SCHOOLTEMPLATE"); Replaced.add("TRƯỜNG " + schoolF.getText().trim().toUpperCase());
        someWords.add("ClassTemplate"); Replaced.add(gradeF.getText().trim().toUpperCase());
        someWords.add("NameTemplate"); Replaced.add(ChuanHoaXau(nameF.getText()));
        someWords.add("YearTemplate"); Replaced.add(getYear());
        if(book.isSelected()){
            replaceText(someWords, Replaced, bookPath,"output1.docx");
            inputPaths.add(folderPath + "output1.docx");
        }
        if (note.isSelected()){
            String[] noteList = jta.getText().split("\n");
            for(int i = 1;i <= 24;i++){
                if(i <= noteList.length){
                    someWords.add("SubjectTemplate" + String.format("%02d", i));
                    Replaced.add(noteList[i - 1]);
                }
                else{
                    someWords.add("SubjectTemplate" + String.format("%02d", i));
                    Replaced.add("");
                }
            }
            replaceText(someWords, Replaced, notePath, "output2.docx");
            inputPaths.add(folderPath + "output2.docx");
        }
        convertDocxToPdf(inputPaths, folderPath + "output.pdf");
    }
    
    public void delTextArea(JTextArea jta){
        jta.setText("");
    }
    
    public void limitLineTextArea(JTextArea jta){
        int maxLines = 25; 
        ((AbstractDocument) jta.getDocument()).setDocumentFilter(new DocumentFilter() {
            @Override
            public void insertString(DocumentFilter.FilterBypass fb, int offs, String str, AttributeSet a) throws BadLocationException {
                if (jta.getLineCount() >= maxLines) {
                    MainView.pushMsg("Bạn đã được nhập đủ 24 nhãn vở");
                    return;
                }
                super.insertString(fb, offs, str, a);
            }

            @Override
            public void replace(DocumentFilter.FilterBypass fb, int offs, int length, String str, AttributeSet a) throws BadLocationException {
                if (jta.getLineCount() >= maxLines) {
                    MainView.pushMsg("Bạn đã được nhập đủ 24 nhãn vở");
                    return;
                }
                super.replace(fb, offs, length, str, a);
            }
        });
    }
    
    public void addLabel(JLabel jl){   
        int d = jLabels.size() + 1;
        ImageIcon img = new ImageIcon(folderPath + "label_" + String.format("%d", d) + ".png");
        Image image = img.getImage();
        Image scaledImage = image.getScaledInstance(jl.getWidth(), jl.getHeight(), Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);
        jl.setIcon(scaledIcon);
        Border defaultBorder = BorderFactory.createLineBorder(Color.BLACK, 1); // Đường viền mặc định
        Border clickedBorder = BorderFactory.createLineBorder(Color.RED, 2);
        jl.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                int k = 0;
                for(JLabel tmp : jLabels){
                    k++;
                    if(tmp == jl){
                        bookPath = "book_" + String.format("%d", k) + ".docx";
                        notePath = "notebook_" + String.format("%d", k) + ".docx";
                    }
                    tmp.setBorder(defaultBorder);
                }
                jl.setBorder(clickedBorder); // Thiết lập đường viền khi click
            }
        });
        jLabels.add(jl);
    }
    
    public void setLogo(JLabel jl){
        ImageIcon img = new ImageIcon(folderPath + "logo" + ".png");
        Image image = img.getImage();
        Image scaledImage = image.getScaledInstance(jl.getWidth(), jl.getHeight(), Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);
        jl.setIcon(scaledIcon);
    }
}
