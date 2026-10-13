"""Generate translated one-page letters matching create-parental-consent-letter.py.

Requires reportlab>=5, uharfbuzz and pymupdf. CONSENT_FONT can override the
Windows Nirmala UI font with another Sinhala/Tamil-capable TrueType font.
"""
import os
from pathlib import Path
import pymupdf
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/docs"
PREVIEW = ROOT / "tmp/pdfs"
NAVY = colors.HexColor("#07173f")
MUTED = colors.HexColor("#52617b")
RULE = colors.HexColor("#aab6c8")
LEFT, RIGHT = 52, A4[0] - 52
COPY = {
    "si": {
        "title": "මව්පිය කැමැත්ත ප්‍රකාශ කිරීමේ ලිපිය",
        "intro": "2026 නොවැම්බර් 14-15 දිනවල මහනුවර දේශීය වැඩසටහනට සහභාගී වන වයස අවුරුදු 18ට අඩු අය සඳහාය.",
        "fields": ["සහභාගිවන්නාගේ සම්පූර්ණ නම", "සහභාගිවන්නාගේ උපන් දිනය", "මව්පිය හෝ නීත්‍යනුකූල භාරකරුගේ සම්පූර්ණ නම", "මව්පිය හෝ නීත්‍යනුකූල භාරකරුගේ දුරකථන අංකය", "මව්පිය හෝ නීත්‍යනුකූල භාරකරුගේ ඊමේල් ලිපිනය"],
        "heading": "කැමැත්ත ප්‍රකාශය",
        "consent": "ඉහත නම් සඳහන් සහභාගිවන්නාගේ මව්පියා හෝ නීත්‍යනුකූල භාරකරු මම බව තහවුරු කරමි. 2026 නොවැම්බර් 14-15 දිනවල NASA Space Apps Kandy වැඩසටහනට ඔහු හෝ ඇය සහභාගී වීමට කැමැත්ත දෙමි. නිල NASA Space Apps වෙබ් අඩවිය හරහා ඔහු හෝ ඇය ලියාපදිංචි කර, වැඩසටහන පැවැත්වෙන දිනයේ මෙම අත්සන් කළ ලිපිය මහනුවර සංවිධායක කණ්ඩායමට භාර දෙමි.",
        "signature": "භාරකරුගේ අත්සන",
        "date": "අත්සන් කළ දිනය",
        "contact": "අධීක්ෂණය සහ ප්‍රවේශ කටයුතු සඳහා info@nasaspaceapps.lk අමතන්න.",
        "note": "මෙම දේශීය කැමැත්ත ප්‍රකාශ කිරීමේ ලිපිය නිල NASA Space Apps ලියාපදිංචිය වෙනුවට භාවිත කළ නොහැක.",
    },
    "ta": {
        "title": "பெற்றோர் ஒப்புதல் கடிதம்",
        "intro": "2026 நவம்பர் 14-15 தேதிகளில் கண்டி உள்ளூர் நிகழ்வில் பங்கேற்கும் 18 வயதுக்குட்பட்டவர்களுக்கானது.",
        "fields": ["பங்கேற்பாளரின் முழுப் பெயர்", "பங்கேற்பாளரின் பிறந்த தேதி", "பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலரின் முழுப் பெயர்", "பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலரின் தொலைபேசி எண்", "பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலரின் மின்னஞ்சல் முகவரி"],
        "heading": "ஒப்புதல்",
        "consent": "மேலே பெயரிடப்பட்ட பங்கேற்பாளரின் பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலர் நான் என்பதை உறுதிப்படுத்துகிறேன். 2026 நவம்பர் 14-15 தேதிகளில் NASA Space Apps Kandy நிகழ்வில் அவர் பங்கேற்க ஒப்புதல் அளிக்கிறேன். அதிகாரபூர்வ NASA Space Apps இணையதளம் மூலம் அவரைப் பதிவுசெய்து, நிகழ்வு நாளில் கையொப்பமிட்ட இந்தக் கடிதத்தைக் கண்டி ஏற்பாட்டுக் குழுவிடம் வழங்குவேன்.",
        "signature": "பாதுகாவலரின் கையொப்பம்",
        "date": "கையொப்பமிட்ட தேதி",
        "contact": "மேற்பார்வை மற்றும் அணுகல் ஏற்பாடுகளுக்கு info@nasaspaceapps.lk ஐத் தொடர்புகொள்ளவும்.",
        "note": "இந்த உள்ளூர் ஒப்புதல் கடிதம் அதிகாரபூர்வ NASA Space Apps பதிவிற்கு மாற்றாகாது.",
    },
}


def paragraph(pdf, text, y, size=10, color=NAVY, x=LEFT, width=RIGHT-LEFT, center=False):
    style = ParagraphStyle("copy", fontName="LocalScript", fontSize=size,
                           leading=size*1.65, textColor=color, shaping=1,
                           alignment=1 if center else 0)
    block = Paragraph(text, style)
    _, height = block.wrap(width, A4[1])
    block.drawOn(pdf, x, y-height)
    return y-height


def main():
    font = os.environ.get("CONSENT_FONT", "C:/Windows/Fonts/Nirmala.ttc")
    pdfmetrics.registerFont(TTFont("LocalScript", font, subfontIndex=0, shapable=True))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    for lang, copy in COPY.items():
        path = OUTPUT / f"parental-consent-letter-{lang}.pdf"
        pdf = canvas.Canvas(str(path), pagesize=A4)
        pdf.setTitle(f"NASA Space Apps Kandy 2026 - {copy['title']}")
        pdf.setAuthor("NASA Space Apps Kandy")
        width, height = A4
        pdf.setFillColor(NAVY)
        pdf.rect(0, height-130, width, 130, fill=1, stroke=0)
        pdf.drawImage(ImageReader(str(ROOT / "public/logos/nasaspaceappskandy-white.png")), (width-238)/2, height-111, width=238, height=94, mask="auto")
        paragraph(pdf, copy["title"], height-148, size=18, center=True)
        pdf.setStrokeColor(colors.HexColor("#eafe07"))
        pdf.setLineWidth(3)
        pdf.line(width/2-35, height-188, width/2+35, height-188)
        pdf.setLineWidth(1)
        paragraph(pdf, copy["intro"], height-204, size=9, color=MUTED)
        y = height-250
        for label in copy["fields"]:
            paragraph(pdf, label, y, size=9)
            pdf.setStrokeColor(RULE)
            pdf.line(LEFT, y-36, RIGHT, y-36)
            y -= 51
        y = paragraph(pdf, copy["heading"], y, size=11)-5
        y = paragraph(pdf, copy["consent"], y, size=9)-15
        signature_bottom = paragraph(pdf, copy["signature"], y, size=9, width=300)
        date_bottom = paragraph(pdf, copy["date"], y, size=9, x=LEFT+324, width=RIGHT-LEFT-324)
        line_y = min(signature_bottom, date_bottom)-30
        assert line_y > 120, f"Signature overlaps footer: {lang}"
        pdf.setStrokeColor(RULE)
        pdf.line(LEFT, line_y, LEFT+300, line_y)
        pdf.line(LEFT+324, line_y, RIGHT, line_y)
        foot_y = paragraph(pdf, copy["contact"], 105, size=8, color=MUTED)-4
        foot_y = paragraph(pdf, copy["note"], foot_y, size=8, color=MUTED)
        assert foot_y > 54, f"Footer overlaps rule: {lang}"
        pdf.setStrokeColor(colors.HexColor("#d5dce7"))
        pdf.line(LEFT, 54, RIGHT, 54)
        pdf.setFillColor(MUTED)
        pdf.setFont("Helvetica", 8)
        pdf.drawString(LEFT, 39, "NASA Space Apps Kandy 2026")
        pdf.drawRightString(RIGHT, 39, "nasaspaceapps.lk")
        pdf.save()
        print(f"Created {path.name}")
    for path in OUTPUT.glob("parental-consent-letter*.pdf"):
        with pymupdf.open(path) as doc:
            assert len(doc) == 1
            doc[0].get_pixmap(matrix=pymupdf.Matrix(1.7, 1.7)).save(PREVIEW / f"{path.stem}.png")
            assert doc[0].get_text().strip()
            print(f"Verified and rendered {path.name}")


if __name__ == "__main__":
    main()
