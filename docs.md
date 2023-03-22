# HanLabel

## Ngày 22/03/2023
Các tính năng đã phát triển thêm :
- In nhãn vở (70%)
- Đã thay đổi được template cho nhãn vở ( tạm thời chỉ mới có 2 mẫu nhãn vở <sẽ cập nhật thêm>) (80%)

Các tính năng sẽ phát triển sắp tới :
- Hiện PrintPreview
- Hiện bảng thông báo đang thực hiện chương trình

## Trước ngày 21/03/2023

Các thư viện bên ngoài :
- documents4j v1.1.10 và itextpdf v5.5.10
    - Dùng để chuyển file docx thành file pdf.
- apache.poi v5.2.3
    - Dùng để thao tác với file docx
- apache.pdfbox v2.0.27 và awt.print (có sẵn)
    - Dùng để in file pdf

Vì khi in bằng file docx thì mình sẽ phải truyền hết từng phần tử trong file docx vào hệ thống in, việc này nó sẽ khá là phiền phức. Vì vậy, mình đã sử dụng thêm 2 thư viện ngoài để chuyển file docx thành file pdf để thuận tiện cho việc in.\

Một số tính năng hiện có :
- Lúc nhập trường, lớp, họ tên sẽ có xử lý ngoại lệ : chưa nhập thông tin thì không được in,...
- Chỉ mới in được nhãn sách
- Ở areaText nhập nhãn vở chỉ nhập tối đa 24 nhãn (vừa đủ 1 trang giấy). Nếu muốn nhập thêm có thể bấm nút xóa và nhập tên các nhãn cần in. Nếu không đủ 24 thì những nhãn còn lại sẽ trống

Một số tính năng sẽ phát triển trong sắp tới :
- Chọn template cho nhãn vở
- In nhãn vở
- Hiện PrintPreview
- Hiện bảng thông báo đang thực hiện chương trình

