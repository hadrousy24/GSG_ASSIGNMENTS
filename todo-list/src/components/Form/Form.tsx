const Form = () => {
    return (
        <form className='form-wrapper'>
            <input type="text" name="label"
                placeholder='Type todo here...' />
            <div>
                <label htmlFor="urgent">Urgent</label>
                <input
                    type="checkbox" id="urgent" />
            </div>
            <input type="submit" value="Add Todo" />
        </form>
    )
}

export default Form;
