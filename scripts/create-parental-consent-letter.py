from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "docs" / "parental-consent-letter.pdf"
LOGO = Path(__file__).resolve().parents[1] / "public" / "logos" / "nasaspaceappskandy-white.png"
NAVY = colors.HexColor("#07173f")
YELLOW = colors.HexColor("#eafe07")
MUTED = colors.HexColor("#52617b")
RULE = colors.HexColor("#aab6c8")
LEFT = 52
RIGHT = A4[0] - 52


def field(pdf: canvas.Canvas, label: str, y: float) -> float:
    pdf.setFont("Helvetica", 10)
    pdf.setFillColor(NAVY)
    pdf.drawString(LEFT, y, label)
    pdf.setStrokeColor(RULE)
    pdf.line(LEFT, y - 24, RIGHT, y - 24)
    return y - 53


def signing_field(pdf: canvas.Canvas, label: str, x: float, width: float, y: float) -> None:
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(x, y, label)
    pdf.setStrokeColor(RULE)
    pdf.line(x, y - 43, x + width, y - 43)


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    pdf.setTitle("NASA Space Apps Kandy 2026 - Parental consent letter")
    pdf.setAuthor("NASA Space Apps Kandy")
    width, height = A4

    pdf.setFillColor(NAVY)
    pdf.rect(0, height - 130, width, 130, fill=1, stroke=0)
    pdf.drawImage(ImageReader(str(LOGO)), (width - 238) / 2, height - 111, width=238, height=94, mask="auto")

    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawCentredString(width / 2, height - 174, "Parental consent letter")
    pdf.setStrokeColor(YELLOW)
    pdf.setLineWidth(3)
    pdf.line(width / 2 - 35, height - 188, width / 2 + 35, height - 188)
    pdf.setLineWidth(1)

    y = height - 218
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 10)
    pdf.drawString(LEFT, y, "For participants under 18 attending the Kandy local event on 14-15 November 2026.")
    y -= 38
    for label in (
        "Participant's full name",
        "Participant's date of birth",
        "Parent or legal guardian's full name",
        "Parent or legal guardian's phone number",
        "Parent or legal guardian's email address",
    ):
        y = field(pdf, label, y)

    pdf.setFont("Helvetica-Bold", 11)
    pdf.setFillColor(NAVY)
    pdf.drawString(LEFT, y + 5, "Consent")
    pdf.setFont("Helvetica", 10)
    lines = [
        "I confirm that I am the parent or legal guardian of the participant named above.",
        "I consent to their participation in NASA Space Apps Kandy on 14-15 November 2026.",
        "I will register them through the official NASA Space Apps website and provide this",
        "signed letter to the Kandy organising team on the event day.",
    ]
    y -= 17
    for line in lines:
        pdf.drawString(LEFT, y, line)
        y -= 17

    y -= 12
    signature_width = 300
    signing_field(pdf, "Parent or legal guardian's signature", LEFT, signature_width, y)
    signing_field(pdf, "Date signed", LEFT + signature_width + 24, RIGHT - LEFT - signature_width - 24, y)

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(LEFT, 91, "Please contact info@nasaspaceapps.lk for supervision and access arrangements.")
    pdf.drawString(LEFT, 75, "This local consent letter does not replace the official NASA Space Apps registration.")
    pdf.setStrokeColor(colors.HexColor("#d5dce7"))
    pdf.line(LEFT, 54, RIGHT, 54)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(LEFT, 39, "NASA Space Apps Kandy 2026")
    pdf.drawRightString(RIGHT, 39, "nasaspaceapps.lk")
    pdf.save()


if __name__ == "__main__":
    main()
