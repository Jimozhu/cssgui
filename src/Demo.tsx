import './demo.css';
import { useState } from "react";
import { codegen, Dimension, DimensionInput, Editor, Inputs, parseStyles, styled, Styles } from ".";
import { parseStyleString } from './lib/parsers';

type AvatarStyles = Pick<Styles, 'fontFamily' | 'fontSize' | 'textAlign' | 'color' | 'backgroundColor'>;

export function Demo() {
  const [styles, setStyles] = useState<Styles>({
    fontFamily: 'Recursive',
    fontSize: "larger",
    // fontSize:{
    //   value: 25,
    //   unit: 'px',
    // },
    // fontSize: "25px",
    textAlign: "center",
    color: '#e30f0f',
    backgroundColor: '#96e4cfe8',
  });

//   const stylesRecord = parseStyleString(`
// .style2 {
//     background-color: rgba(150, 228, 207, 0.91);
//     color: rgb(255, 0, 255);
//     /* font-family: Rammetto One; */
//     font-size: larger;
//     /* text-align: center;
//     /* font-style: italic;
//     /* font-weight: bold;
//     /* text-decoration: double; */
//     /* border: 1px solid red; */
//     /* border-radius: 5px; */

//     /* margin: 5px; */
//     /* padding: 5px; */
// }
//     `);
//   const styles2Obj = parseStyles(stylesRecord);

  const [style2, setStyle2] = useState<AvatarStyles>({
    fontFamily: 'Recursive',
    // fontSize: { unit: 'px', value: 26 },
    // fontSize: "26px",
    fontSize: "larger",
    textAlign: "center",
    color: '#e30f0f',
    backgroundColor: '#96e4cfe8',
  });

  const overrideUnits = () => {
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
