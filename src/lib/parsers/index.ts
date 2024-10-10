export function parseStyleString(rawStyleStr: string) {
  const record: Record<string, string> = {};

  const sheet = new CSSStyleSheet({ disabled: true });
  const idx = sheet.insertRule(rawStyleStr);
  const rule = sheet.cssRules[idx];
  if (rule instanceof CSSStyleRule) {
    const style: CSSStyleDeclaration = rule.style;
    Object.entries(style).forEach(([property, value]) => {
      if (isNaN(Number(property)) && value) {
        record[property] = value;
      }
    });
  }
  return record;
}
