import './StyleEditor.css';
import { useState } from "react";
import { codegen, Dimension, DimensionInput, Editor, Inputs, styled, Styles } from ".";

export function StyleEditor() {
  const [styles, setStyles] = useState<Styles>({
    fontFamily: 'Recursive',
    // fontSize: "larger",
    textAlign: "center",
    color: '#e30f0f',
    backgroundColor: '#96e4cfe8',
  });

  const [style2, setStyle2] = useState<Styles>({
    fontFamily: 'Recursive',
    // fontSize: { unit: 'px', value: 26 },
    // fontSize: "26px",
    fontSize: "larger",
    textAlign: "center",
    color: '#e30f0f',
    backgroundColor: '#96e4cfe8',
  });

  const overrideUnits = (units: string[]) => {
    // console.log('Inputs.FontSize', units);
    return ['px', 'rem', 'em', 'vh', 'vw'];
  };

  return (
    <section>
      <header><h1>Style Editor</h1></header>
      <main>
        <div className="preview" style={{ height: '300px', overflow: 'auto' }}>
          <styled.p styles={styles}>Hello, world!</styled.p>
          <div className="style1">This command runs the pnpm rebuild command in every package of the monorepo.</div>
          <div className="style2">This is style 2!</div>
        </div>
        <div className="editors">
          <Editor
            styles={styles}
            onChange={setStyles}
            showRegenerate={false}
            showFieldRegenerate={false}
          // showAddProperties={true}
          >
            <div>
              <h3>Typography</h3>
              <Inputs.FontFamily showVariants={false} showVariable={false} />
              <Inputs.FontSize label="大小" regenerate={false} showVariants={false} overrideUnits={overrideUnits} />
              <Inputs.FontStyle />
              <Inputs.FontWeight />
              <Inputs.TextAlign showVariants={false} />
              <h3>Colors</h3>
              <Inputs.Color showVariants={false} />
              <Inputs.BackgroundColor showVariants={false} />
              <Inputs.BackgroundImage />
              <h3>Border</h3>
              <Inputs.BorderStyle />
              <Inputs.BorderWidth />
              <Inputs.BorderColor />
              <Inputs.BorderRadius />
              <h3>Space1</h3>
              <Inputs.Margin showVariants={false} />
              <Inputs.Padding showVariants={false} />
              <h3>Spacing2</h3>
              <Inputs.MarginTop units={['px', 'em', 'rem']} />
              <Inputs.MarginRight />
              <Inputs.MarginBottom />
              <Inputs.MarginLeft />
              <Inputs.PaddingTop />
              <Inputs.PaddingRight />
              <Inputs.PaddingBottom />
              <Inputs.PaddingLeft />
              <h3>Size</h3>
              <Inputs.Width showVariants={false} units={['px', 'em', 'rem']} />
              <Inputs.MaxWidth showVariants={false} />
              <Inputs.Height showVariants={false} units={['px', 'em', 'rem']} />
              <DimensionInput property="maxHeight" value={{ value: 200, unit: 'px' }} units={['px', 'em', 'rem']} label={"maxHeight"} onChange={function (newValue: Dimension): void {
                console.log('maxHeight newValue', newValue);
              }} />
            </div>
          </Editor>
          <Editor styles={style2} onChange={setStyle2}></Editor>
        </div>
        <div className="codes">
          <pre>
            <code>
              {codegen.css(styles, { selector: '.style1' })}
              <br />
              {codegen.css(style2, { selector: '.style2' })}
            </code>
          </pre>
          <style>
            {codegen.css(styles, { selector: '.style1' })}
            {codegen.css(style2, { selector: '.style2' })}
          </style>
        </div>
      </main>
    </section>
  );
}
