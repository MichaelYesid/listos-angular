import { StructureInput } from "./generic-input-base.classes";

export class GenericInput extends StructureInput<any> {
    controlType = 'inputText';
}

export class GenericPassword extends StructureInput<any> {
    controlType = 'inputPassword';
}

export class GenericSignature extends StructureInput<any> {
    controlType = 'inputSignature';
}

export class GenericSelect extends StructureInput<any> {
    controlType = 'inputSelect';
}

export class GenericCheckbox extends StructureInput<any> {
    controlType = 'inputCheckbox';
}

export class GenericTextarea extends StructureInput<any> {
    controlType = 'inputTextarea';
}

export class GenericDate extends StructureInput<any> {
    controlType = 'inputDate';
}

export class GenericHour extends StructureInput<any> {
    controlType = 'inputHour';
}

export class GenericDateMonth extends StructureInput<any> {
 controlType = 'inputMonthDate';
    //controlType = 'inputDate';
}

export class GenericFile extends StructureInput<any> {
    controlType = 'inputFile';
}

export class GenericAnchor extends StructureInput<any> {
    controlType = 'inputAnchor';
}

export class GenericEmpty extends StructureInput<any> {
    controlType = 'inputEmpty';
}

export class GenericSection extends StructureInput<any> {
    controlType = 'inputHr';
}

export class GenericDireccion extends StructureInput<any> {
    controlType = 'inputDireccion';
}

export class GenericRating extends StructureInput<any> {
    controlType = 'inputRating';
}

export class GenericAutoComplete extends StructureInput<any> {
    controlType = 'inputAutoComplete';
}

export class GenericBadgeSet extends StructureInput<any> {
    controlType = 'inputBadgeSet';
}

export class GenericBadgeSetNotFree extends StructureInput<any> {
    controlType = 'inputBadgeSetNotFree';
}

export class GenericAutoCompleteFreeText extends StructureInput<any> {
    controlType = 'inputAutoCompleteFreeText';
}

export class GenericTextSummary extends StructureInput<any> {
    controlType = 'inputTextSummary';
}

export class GenericHidden extends StructureInput<any> {
    controlType = 'inputHidden';
}

export class GenericInputRepeater extends StructureInput<any> {
    controlType = 'inputRepeater';
}

export class GenericCheckboxMultiple extends StructureInput<any> {
    controlType = 'inputCheckboxMultiple';
}

export class GenericSliderRange extends StructureInput<any> {
    controlType = 'inputSliderRange';
}

export class GenericCurrency extends StructureInput<any> {
    controlType = 'inputCurrency';
}

export class GenericHTML extends StructureInput<any> {
    controlType = 'inputHTML';
}

export class GenericItem extends StructureInput<any> {
}