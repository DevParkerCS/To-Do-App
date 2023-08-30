import styles from './WarningModal.module.css'

export const WarningModal = ({title, text, btnText1, btnText2, active}) => {
    return (<div className={`${styles.modalWrapper} ${active? styles.active: ''}`}>
        <div className={styles.modalTitle}>{title? title : 'Alert Title'}</div>
        <div className={styles.modalText}>{text? text : 'Alert Text'}</div>
        <div className={styles.modalBtnWrapper}>
            <button className={`${styles.cancelBtn} ${styles.modalBtn}`}>{'Cancel'}</button>
            <button className={`${styles.deleteBtn} ${styles.modalBtn}`}>{'Delete'}</button>
        </div>
    </div>)
}